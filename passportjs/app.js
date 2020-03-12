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
      userNameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, username, password, done) {
      process.nextTick(function() {
        //ユーザ名、パスワード不正時の処理を記述する
        if (!username) {
          return done(null, false, { message: "Username is incorrect" });
          //↓にはPasswordチェック処理を実装してください。
        } else if (password !== result[0].password) {
          return done(null, false, { message: "Username is incorrect" });
        } else {
          console.log("username" + username);
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
