/*
用药助手13.14 
脚本作者：@ios151 感谢@Anni提供ck
特别说明：<临床指南→指南专题>没有解锁.如需解锁完整版单独使用yyzsck.js版
免责声明：仅供学习 请勿传播
更新时间: 2023.8.16.2.00.

[rewrite_local]
#纯会员数据共享
^https://newdrugs.dxy.cn url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/yyzsck.js
#修改个人用户信息
^https://newdrugs.dxy.cn url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/yyzs2.js
#pdf获取 测试远程不行 放本地用吧
#^https:\/\/file1\.dxycdn\.com\/ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/pdf-url.js

[mitm]
hostname = newdrugs.dxy.cn, file1.dxycdn.com

*/
const newHeaders = {
  'Host': 'newdrugs.dxy.cn',
  'Cookie': 'CASTGC=TGT-68706-CxFnpAv4zevsePELF7cHlpJvagahzT32ZZV-50; app-username=dxy_s7dau2c5; JSESSIONID=BD0EEBD65C41130837AEDB7F318856B4; CLASS_CASTGC=51b6429c99385010d739ceb7ac3d6e6a62234fab1e04aef48ff72c26bd264e62719e0ca0217c773e5c25ce62939b490d220c3d0c6ffe44b96ed34d3615f29a2fbbb1e6f903bbbf31c2504d36e11b2702e5926a006de657f8a5e4d631ed492169941575976a53b3a86d631ed0042f335fe9d0a7969ad83d6c35d183fde9f72fea416749df46d58c981c3d51dfd3e14dcd05af9d328ed02f25ff7aa9cd96e22acd4e52ee35ab8fab848b98843db20a304d5dfb4ceae9dc81f4d46e390e7217e5070988c036c7e36617fb8ee4df715b7ce472f570027f60628dbcccc60124ef1c62b045427b9e1cb4eaed6b53e454825a253f1ddd3c77fc7e4208133a49e8ad82fb; JUTE_BBS_DATA=f847f0adbc1abf7bfa87eaab997abb6df962a8dd0be8ffc154af6a87a80da933abd84828c55a200bd6b8771ad148ce5597663633b615cc67127246d348af1c5fe80559354438e03e5d01a10535425646',
  'app-sandbox': '0',
  'Accept': '*/*',
  'app-version': '13.14',
  'app-os': '15.1.1',
  'app-username': 'dxy_s7dau2c5',
  'app-mc': '8A8DA63419E74D65B3BF66DDA5B44FA412345678udidfor7',
  'app-mt': 'iPhone_iOS15.1.1',
  'Accept-Language': 'zh-Hans-CN;q=1.0, en-CN;q=0.9, zh-Hant-HK;q=0.8',
  'app-hard-name': 'iPhone',
  'Referer': 'https://newdrugs.dxy.cn',
  'Accept-Encoding': 'br;q=1.0, gzip;q=0.9, deflate;q=0.8',
  'User-Agent': 'drugspro/13.14 (cn.dxy.drugspro; build:1282; iOS 15.1.1) Alamofire/5.6.4',
  'Connection': 'keep-alive',
  'app-ac': '4124c5f1-1029-4fda-b06f-a87ac5ad8d9f',
  'DXY-AUTH-TOKEN': 'TGT-68706-CxFnpAv4zevsePELF7cHlpJvagahzT32ZZV-50',
  'app-os-version': '15.1.1'
};

const requestHeaders = $request.headers;
Object.assign(requestHeaders, newHeaders);
console.log(JSON.stringify(requestHeaders));

$done({ headers: requestHeaders });
