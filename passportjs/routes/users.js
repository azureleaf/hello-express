var express = require("express");
var router = express.Router();
var passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  // ログインしたユーザーからのrequestにはuserが設定されていることに注意
  // このreq.userは、セッション管理のMWで付加されるもの
  // req.userを送信する側でrequestに付加するわけではない
  // （それはそうだ。ユーザー側で捏造し放題になったら無意味。ユーザーあらかじめuserヘッダを捏造した場合、それは処理前に削除されるのか？)
  // ログインしていなければ、userは空っぽのまま渡される
  res.render("index", { title: "Index page", user: req.user });
});

// ログイン画面の表示
router.get("/login", function(req, res) {
  res.render("login", { title: "Login Page", user: req.user });
});

// ログイン処理の受付
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/private",
    failureRedirect: "/users/login",
    session: true // sessionを使用しないので、アクセスするたびにログインを要求される？
    // failureFlash: "ログイン情報が不正です"
  })
);

// ログアウト処理の受付
router.get("/logout", function(req, res) {
  req.logout(); // passport組み込みの関数っぽい
  res.redirect("/");
});

router.get("/private", function(req, res) {
  if (!req.user) {
    console.log(
      "限定ページへのアクセス要求がありましたが、ログインしていないため拒絶します"
    );
    res.redirect("/users/login");
  } else {
    res.render("private", { title: "Private Page", user: req.user });
  }
});

// 以下のように、認証済みかチェックするミドルウェア＋レンダー関数というやり方もできる
// 。。。はずだが、なぜか上手くいかない（認証していないのに通ってしまう）
checkAuth = function(req, res, next) {
  if (req.user) {
    console.log("このユーザは認証済みです");
    return next();
  }
  // ログイン済みでない時
  req.session.redirectTo = "/users/private2"; // ログイン後にこの画面に戻るため、このURLをセッションに記憶しておく
  res.redirect("/users/login");
};

router.get("/private2", checkAuth, function(req, res) {
  res.render("private", { title: "Private Page", user: req.user });
});

module.exports = router;
