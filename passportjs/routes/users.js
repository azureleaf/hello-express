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
// Custom Callbackを定義する
router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/users/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect(
        // ユーザをログイン画面の直前にいたURLに戻す
        req.session.redirectTo ? req.session.redirectTo : "/"
      );
    });
  })(req, res, next);
});

// ログアウト処理の受付
router.get("/logout", function(req, res) {
  req.logout(); // passport組み込みの関数っぽい
  res.redirect("/");
});

// 会員ページへのログイン要求の書き方その１：
// routingのところにログインしているか否かのチェックをベタ書きするパターン
router.get("/private1", function(req, res) {
  if (!req.user) {
    console.log(
      "限定ページへのアクセス要求がありましたが、未認証のためログインページに飛ばします"
    );
    req.session.redirectTo = "/users/private1";
    res.redirect("/users/login");
  } else {
    delete req.session.redirectTo;
    res.render("private", {
      title: "Private Page 1",
      user: req.user
    });
  }
});

// ログイン処理のミドルウェアにより、要認証ページそれぞれのroutingでの記述量を削減する
checkAuth = function(req, res, next) {
  if (req.user) {
    // ログイン済みの場合の処理
    console.log("このユーザは認証済みです");
    return next();
  }
  // ログイン後にこの画面に戻るため、このURLをセッションに記憶しておく
  req.session.redirectTo = req.originalUrl; // users/private2からこのMWを呼び出したなら、そのURLが入る
  res.redirect("/users/login");
};

// 会員ページへのログイン要求の書き方その2
// 現在ログイン状態か否かのミドルウェアを用意し、それにより各routingの記述量を削減するパターン
router.get("/private2", checkAuth, function(req, res) {
  // 予期せぬ副作用を防ぐため、使い終わったsessionの値を削除する
  delete req.session.redirectTo;
  res.render("private", {
    title: "Private Page 2",
    user: req.user
  });
});

router.get("/private3", checkAuth, function(req, res) {
  delete req.session.redirectTo;
  res.render("private", {
    title: "Private Page 3",
    user: req.user
  });
});

module.exports = router;
