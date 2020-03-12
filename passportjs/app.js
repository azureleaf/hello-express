var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// AKB: passport-related moudles
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// AKB: passport settings
app.use(session({ secret: "masamune" }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    {
      // この部分の意味は？<input>側のnameがこれと一致してなくても動くようだが
      userNameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    // "done(ERROR, USER, OPTIONS)" is callback function
    function(req, username, password, done) {
      process.nextTick(function() {
        console.log("here we go");
        if (!username) {
          // ユーザー名が空っぽの時の処理???ではないっぽい
          // 実際には空っぽでもこの部分に到達しない
          // ユーザーもしくはパスワードの一方が空のときは、そもそもこの関数が実行されていない
          console.log("ユーザ名未入力でのログイン試行です");
          return done(null, false, {
            message: "ユーザー名が入力されていません"
          });
        } else if (password !== "test" || username !== "test") {
          // ログイン情報が不正確なときの処理
          // 実際はDBへのアクセス処理をここに書き、それがログイン情報と一致しているかの処理を書く
          console.log("不正な値でのログイン試行です");
          return done(null, false, {
            message: "パスワードかユーザー名が不正です"
          });
        } else {
          console.log("ログイン成功。ユーザー名は", username);
          return done(null, username);
        }
      });
    }
  )
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
