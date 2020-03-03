var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/echo", function(req, res, next) {
  res.render("index", { title: "res.renderのデモ", msg: "/test/にGETメソッドでアクセスしました" });
});

// Request bodyをそのままオウム返しで返す
router.post("/echo", function(req, res, next) {
  // res.send(req.body.text);
  res.render("index", { title: "res.renderのデモ", msg: req.body.text });
});

// Requestの内容を少しだけ変更して返す
router.post("/members", function(req, res, next) {
  // Viewの管理はVue.js側でやるので、ここではJSONを返すだけに留める
  res.json({ 
    msg: "メンバーの送信を確認しました", 
    accessedAt: Date(Date.now()).toString(),
    name: req.body.memberName + "さん",
    office: req.body.memberOffice + "事業所"
   });
});

module.exports = router;
