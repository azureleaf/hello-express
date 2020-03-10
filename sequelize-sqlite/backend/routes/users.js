var express = require("express");
var router = express.Router();
var models = require("../models/"); // model/index.js内部の処理も使うので、必要なモデルだけでなくModelsディレクトリ全体を持ってくる

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/add", function(req, res, next) {
  console.log("userRouter!");
  models.user
    .create({
      name: "佐藤一郎",
      office: "泉",
      gender: "male",
      created_at: new Date(),
      updated_at: new Date()
    })
    .then(() => {
      return models.user.findAll();
    })
    .then(users => res.json(users))
    .catch(err => {
      console.error("エラーでした:", err);
    });
});

module.exports = router;
