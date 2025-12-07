/**
 * Surge 节点纯净度检测脚本
 * 数据来源: ip-api.com (基础信息) + scamalytics.com (风险评分)
 */

const BASE_URL = 'http://ip-api.com/json';
const SCORE_URL = 'https://scamalytics.com/ip/';

let p1 = new Promise((resolve, reject) => {
  $httpClient.get(BASE_URL, (error, response, data) => {
    if (error) {
      resolve({ error: true, msg: "IP API Error" });
    } else {
      try {
        const json = JSON.parse(data);
        resolve(json);
      } catch (e) {
        resolve({ error: true, msg: "JSON Parse Error" });
      }
    }
  });
});

p1.then((ipData) => {
  if (ipData.error) {
    $done({
      title: "检测失败",
      content: "无法获取 IP 信息，请检查网络",
      icon: "exclamationmark.triangle",
      "icon-color": "#FF0000"
    });
    return;
  }

  const currentIP = ipData.query;
  const countryCode = ipData.countryCode;
  const isp = ipData.isp;
  
  // 获取 IP 之后，去查询风险分数
  $httpClient.get(SCORE_URL + currentIP, (error, response, data) => {
    let score = "N/A";
    let riskLevel = "未知";
    let color = "#808080"; // 灰色

    if (!error && data) {
      // 简单的正则匹配抓取分数
      // Scamalytics 页面通常包含 "Fraud Score: xx"
      const scoreMatch = data.match(/Fraud Score:\s*(\d+)/);
      if (scoreMatch) {
        score = parseInt(scoreMatch[1]);
        
        // 判定颜色
        if (score < 20) {
          riskLevel = "低风险 (纯净)";
          color = "#32CD32"; // 绿色
        } else if (score < 50) {
          riskLevel = "中风险 (一般)";
          color = "#FFA500"; // 橙色
        } else {
          riskLevel = "高风险 (脏IP)";
          color = "#FF0000"; // 红色
        }
      }
    }

    // 组装国旗 Emoji
    const flag = getFlagEmoji(countryCode);

    $done({
      title: `${flag} ${ipData.country} · 风险值: ${score}`,
      content: `IP: ${currentIP}\nISP: ${isp}\n评级: ${riskLevel}`,
      icon: "shield.checkerboard",
      "icon-color": color
    });
  });
});

// 辅助函数：将国家代码转换为 Emoji
function getFlagEmoji(countryCode) {
    if (!countryCode) return "🌍";
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
