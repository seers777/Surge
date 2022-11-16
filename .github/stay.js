/***********************************

> 应用名称：Stay去除仓库广告

[rewrite_local]

# ～ Stay（2022-10-17）
^https?:\/\/api\.shenyin\.name\/stay-fork\/browse\/featured$ url script-response-body https://github.com/seers777/Surge/edit/master/.github/stay.js

[mitm]

hostname=api.shenyin.name
