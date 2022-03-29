const { time } = require("console");
let http = require("http");
const { json } = require("stream/consumers");
let url = require("url");

// port
let port = 8848;
let hostname = "localhost";

// 声明一个数组用来存值
let user = [
  {
    phone: "15539234100",
    password: "fefefe3",
  },
];

http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") return false;
    res.writeHead(200, {
      "content-type": "text/html;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    });
    let url_obj = url.parse(req.url, true);
    console.log(url_obj);
    if (url_obj.pathname === "/registerpage") {
      let result = user.filter((item) =>
        item.phone.includes(url_obj.query.phone)
      );
      if (result.length != 0) {
        res.write('{"no":false,"msg":"已经存在该用户！"}');
      } else {
        user.push(url_obj.query);
        res.write('{"ok":true,"msg":"注册成功"}');
      }
      console.log(user);
    } else if (url_obj.pathname === "/loadpage") {
      let login_in = user.filter(
        (item) =>
          item.phone.includes(url_obj.query.phone) &&
          item.password.includes(url_obj.query.password)
      );
      if (login_in.length != 0) {
        res.write('{"ok":true,"msg":"登录成功"}');
      } else {
        res.write('{"no":false,"msg":"该用户已经逃离了地球，去往了火星"}');
      }
    } else {
    }
    res.end();
  })
  .listen(port, hostname, () => console.log("http://localhost:8848"));
