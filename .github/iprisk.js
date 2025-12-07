// Node Purity Checker for Surge
// 通过若干测试网址判断当前节点是否存在劫持 / 强制门户 / 注入广告等问题

// argument 为策略组名，如不传则默认使用 "Proxy"
const policyName = $argument || "Proxy";

// 可自行扩展 / 修改的测试目标
const tests = [
  {
    name: "Cloudflare 204 测试",
    url: "https://cp.cloudflare.com/generate_204",
    expectedStatus: 204,
    // 预期无 HTML 内容，如果返回了大段 HTML，一般是被跳转到登录页或广告页
    forbidHtml: true
  },
  {
    name: "Google 204 测试",
    url: "https://www.google.com/generate_204",
    expectedStatus: 204,
    forbidHtml: true
  },
  {
    name: "Apple Captive Portal 测试",
    url: "http://captive.apple.com/hotspot-detect.html",
    expectedStatus: 200,
    // 经典成功内容中会包含 "Success"
    mustContain: "Success"
  },
  {
    name: "HTTP 明文劫持测试（Example）",
    url: "http://example.com/",
    expectedStatus: 200,
    // example.com 正常是一个简单页面，如被运营商注入广告，往往会有大量 iframe/script
    checkKeywordNot: ["广告", "推广", "iframe", "脚本"]
  }
];

function run() {
  let results = [];
  let index = 0;

  function next() {
    if (index >= tests.length) {
      summarize(results);
      return;
    }
    const t = tests[index++];
    runSingleTest(t, (r) => {
      results.push(r);
      next();
    });
  }

  next();
}

function runSingleTest(target, callback) {
  const req = {
    url: target.url,
    timeout: 15
  };

  // 通过指定策略组发出请求（使用当前策略组选中的节点）
  if (policyName) req.policy = policyName;

  const start = Date.now();https://github.com/seers777/Surge/blob/master/.github/ip_risk_check.js
  $httpClient.get(req, (error, response, body) => {
    const cost = Date.now() - start;
    let record = {
      name: target.name,
      pass: false,
      reason: "",
      latency: cost
    };

    if (error) {
      record.reason = `网络错误：${error}`;
      return callback(record);
    }

    if (!response) {
      record.reason = "无有效响应";
      return callback(record);
    }

    const status = response.statusCode;
    const headerStr = JSON.stringify(response.headers || {});

    // 状态码检查
    if (target.expectedStatus && status !== target.expectedStatus) {
      record.reason = `状态码异常：${status}（预期 ${target.expectedStatus}）`;
      return callback(record);
    }

    // 必须包含的字符串
    if (target.mustContain) {
      const need = target.mustContain;
      if (!body || !body.includes(need)) {
        record.reason = `内容未包含预期标记 "${need}"，可能被劫持/替换`;
        return callback(record);
      }
    }

    // 禁止出现 HTML（只针对 204 这类）
    if (target.forbidHtml) {
      if (body && body.trim().length > 0) {
        // 204 正常是无内容，如果有大量 HTML，基本是强制门户或广告
        const snippet = body.slice(0, 80).replace(/\s+/g, " ");
        record.reason = `本应无内容却返回数据，疑似强制门户/注入：${snippet}`;
        return callback(record);
      }
    }

    // 不应该出现的关键字（注入广告 / 劫持常见关键词）
    if (target.checkKeywordNot && body) {
      for (const kw of target.checkKeywordNot) {
        if (body.includes(kw)) {
          record.reason = `内容包含可疑关键字 "${kw}"，可能存在注入广告/劫持`;
          return callback(record);
        }
      }
    }

    // 额外简单判断：如果 header 里出现明显的本地运营商 portal 标记，也视作可疑
    const suspectHeadersKeyword = ["portal", "captive", "wlanacname", "bras", "login"];
    for (const kw of suspectHeadersKeyword) {
      if (headerStr.toLowerCase().includes(kw)) {
        record.reason = `响应头包含可疑字段 "${kw}"，可能为运营商强制门户`;
        return callback(record);
      }
    }

    // 全部检查通过
    record.pass = true;
    record.reason = `正常（延迟 ${cost}ms）`;
    callback(record);
  });
}

function summarize(results) {
  const total = results.length;
  const passed = results.filter((i) => i.pass).length;
  const purity = Math.round((passed / total) * 100);

  let level;
  if (purity === 100) level = "优秀";
  else if (purity >= 80) level = "良好";
  else if (purity >= 60) level = "一般";
  else level = "较差";

  const lines = results.map((r) => {
    const icon = r.pass ? "✅" : "❌";
    return `${icon} ${r.name} -> ${r.reason}`;
  });

  const title = `纯净度：${purity}%（${level}）`;
  const subtitle = `策略组：${policyName}`;
  const body = lines.join("\n");

  $notification.post("节点纯净度检测", title, subtitle + "\n" + body);

  $done();
}

// 主入口
run();
