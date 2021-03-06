var express = require("express");
var router = express.Router();
var models = require("../models/"); // model/index.js内部の処理も使うので、必要なモデルだけでなくModelsディレクトリ全体を持ってくる

// 現在のDB内容を返す
router.get("/", function(req, res, next) {
  models.user.findAll().then(users => {
    res.json(users);
  });
});

// アクセスされるたびに固定メンバーを追加
// テスト用。本番でこのようにgetに対してDBを操作したり、getに対してJSONを返したりはしない
router.get("/addsato", function(req, res, next) {
  models.user
    .create({
      name: "佐藤一郎",
      office: "泉",
      gender: "male",
      created_at: new Date(),
      updated_at: new Date()
    })
    .then(() => {
      res.redirect("/users/");
    })
    .catch(err => {
      console.error("エラーでした:", err);
    });
});

// リクエストに基づいて新しいユーザを追加
router.post("/add", function(req, res, next) {
  models.user
    .create({
      name: req.body.name,
      office: req.body.office,
      gender: req.body.gender,
      created_at: new Date(),
      updated_at: new Date()
    })
    .then(() => {
      res.redirect("/users/"); // 更新後の名簿を返す
    })
    .catch(err => {
      console.error("エラーでした:", err);
    });
});

// ユーザーを削除
router.post("/delete/:userid", function(req, res, next) {
  console.log(req.params.userid);
  models.user
    .destroy({
      // 該当するユーザのみをSELECT
      where: {id: req.params.userid}
    })
    .then(() => {
      res.redirect("/users/"); // 更新後の名簿を返す
    })
    .catch(err => {
      // 該当するユーザが見つからなかった時も、エラーはthrowされないっぽい
      console.error("削除時エラー:", err);
    });
});

module.exports = router;
