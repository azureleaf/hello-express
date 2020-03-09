
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Users = require("../models/user.model");
const User = require("../models/user.model");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      Users.findOne({ "local.email": email })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" }
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);