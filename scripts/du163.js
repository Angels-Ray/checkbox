//网易蜗牛读书
const axios = require("axios");
let result = "网易蜗牛每日签到: \n";
function du163() {
  return new Promise(async (resolve) => {
    try {
      const str = require("../config.json").du163;
      const headers = {
        headers: {
          _xsrf: str.xsrf,
          "X-Auth-Token": str["X-Auth-Token"],
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; Redmi K30 Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/85.0.4183.127 Mobile Safari/537.36 NeteaseSnailReader/1.9.11 NetType/3G+ (00ef591f8e05c305;coolapk) NEJSBridge/2.0.0",
        },
      };
      let url = `https://du.163.com/activity/201907/activityCenter/sign.jsonannel=0&_versions=1080&merchant=17Kxiaomi&platform=2&manufacturer=`;
      let data = { csrfToken: str.xsrf || 6 };
      let res = await axios.post(url, data, headers);
      if (res.data.code == -1104) {
        msg = res.data.msg;
      } else if (res.data.code == 0) {
        msg = res.data.message + " 连签" + res.data.continuousSignedDays + "天";
      } else {
        msg = "签到失败,原因未知";
        console.log(res.data);
      }
      result += msg;
      console.log(msg);
    } catch (err) {
      console.log(err);
      result += "签到接口请求失败";
    }
    resolve(result);
  });
}

module.exports = du163;
