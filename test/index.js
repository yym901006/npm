var http = require("http");
var AlipaySdk = require("alipay-sdk");
var fs = require("fs");

http
  .createServer(function(request, response) {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain

    async function get() {
      response.writeHead(200, { "Content-Type": "text/plain" });
      try {
        const alipaySdk = new AlipaySdk.default({
          // 参考下方 SDK 配置
          appId: "2021001100608460",
          privateKey: fs.readFileSync("./rsa_private_key.pem", "ascii")
        });

        const result = await alipaySdk.exec("alipay.system.oauth.token", {
          grantType: "authorization_code",
          code: "9225b2ca9b0c4e3abdbeb7278e61VX76"
          //   refreshToken: "token"
        });
        console.info("result:", result);
        // 发送响应数据 "Hello World"
        response.end("Hello World\n");
      } catch (err) {
        console.info("err:", err);
        response.end("error", JSON.stringify(err));
      }
    }
    get();
  })
  .listen(8888);

// 终端打印如下信息
console.log("Server running at http://127.0.0.1:8888/");
