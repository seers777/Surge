// Surge Panel: Node Purity Checker
// 面板输出 + 纯净度测试

const policyName = $argument || "Proxy";

const tests = [
  { name: "Cloudflare 204", url: "https://cp.cloudflare.com/generate_204", expectedStatus: 204, forbidHtml: true },
  { name: "Google 204", url: "https://www.google.com/generate_204", expectedStatus: 204, forbidHtml: true },
  { name: "Apple Captive", url: "http://captive.apple.com/hotspot-detect.html", expectedStatus: 200, mustContain: "Success" },
  { name: "Example.com", url: "http://example.com/", expectedStatus: 200, checkKeywordNot: ["广告", "推广", "iframe", "脚本"] }
];

async function http(url, policy) {
  return new Promise(resolve =>
    $httpClient.get({ url, policy, timeout: 10 }, (err, resp, body) =>
      resolve({ err, resp, body })
    )
  );
}

async function runTests() {
  let results = [];

  for (const t of tests) {
    const start = Date.now();
    const r = await http(t.url, policyName);
    const cost = Date.now() - start;

    let result = { name: t.name, pass: false, reason: "", latency: cost };

    if (r.err || !r.resp) {
      result.reason = "网络错误";
      results.push(result);
      continue;
    }

    const status = r.resp.statusCode;
    const body = r.body || "";

    if (t.expectedStatus && status !== t.expectedStatus) {
      result.reason = `状态码异常 ${status}`;
      results.push(result);
      continue;
    }

    if (t.mustContain && !body.includes(t.mustContain)) {
      result.reason = `未包含关键字 ${t.mustContain}`;
      results.push(result);
      continue;
    }

    if (t.forbidHtml && body.trim().length > 0) {
      result.reason = `返回异常内容`;
      results.push(result);
      continue;
    }

    if (t.checkKeywordNot) {
      for (const kw of t.checkKeywordNot) {
        if (body.includes(kw)) {
          result.reason = `包含可疑关键词 ${kw}`;
          results.push(result);
          continue;
        }
      }
    }

    result.pass = true;
    result.reason = `正常（${cost}ms）`;
    results.push(result);
  }

  return results;
}

function formatPanel(results) {
  const total = results.length;
  const passed = results.filter(r => r.pass).length;
  const purity = Math.round((passed / total) * 100);

  let level = purity === 100 ? "优秀" : purity >= 80 ? "良好" : purity >= 60 ? "一般" : "较差";

  let lines = results.map(r =>
    `${r.pass ? "🟢" : "🔴"} ${r.name}：${r.reason}`
  );

  return {
    title: "🧪 节点纯净度",
    content:
      `纯净度：${purity}%（${level}）\n` +
      `策略组：${policyName}\n\n` +
      lines.join("\n"),
    icon: purity >= 80 ? "checkmark.cir
