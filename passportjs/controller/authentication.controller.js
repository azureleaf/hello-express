
const User = require("../models/user.model");
const passport = require("passport");

/**
 * This controller exports 4 functions:
 *  login()
 *  signup()
 *  change_password()
 *  forgot_password()
 * 
 */

//auth operations
// Authentication infos are included in the request body
exports.login = function(req, res, next) {
  
  // When the email isn't supplied, return JSON with error message
  if (!req.body.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  // When the password isn't supplied, return JSON with error message
  if (!req.body.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  // When the both PW and email are supplied, try to authenticate with them
  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      // If authentication failed
      if (err) {
        return next(err); // which middleware will catch this???
      }

      // If the authentication is successful

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON(user.token) });
      }

      // BAD REQUEST
      // 
      return res.json({ status: 400 });
    }
  )(req, res, next); // what's this?
};

// Create the user
exports.signup = function(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ "local.email": email }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the email: ${email}`
      });
    }
    const newUser = new User({
      "local.email": email
    });

    newUser.setPassword(password);

    newUser.save((err, savedUser) => {
      if (err) return res.json(err);
      return res.json(savedUser);
    });
  });
};

exports.change_password = function(req, res, next) {
  User.findOne({ resetPasswordToken: req.body.token }).then(function(user) {
    
    //add logic for checking the expiry time of the generated token.

    user.setPassword(req.body.password);

    user.updateOne(
      {
        "local.salt": user.local.salt,
        "local.hash": user.local.hash
      },
      function(err, savedUser) {
        if (err) return res.json(err);
        return res.json(savedUser);
      }
    );
  });
};

exports.forgot_password = function(req, res, next) {
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ "local.email": req.body.email }, function(err, user) {
          if (!user) {
            return res.send({
              error: "No account with that email address exists."
            });
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // logic for expiring password

          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        // Create a SMTP transporter object
        let smtpTransport = nodemailer.createTransport({
          host: process.env.CLIENT_HOST,
          service: "SendGrid",
          port: process.env.SENDGRID_PORT,
          auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
          },
          logger: true,
          debug: true // include SMTP traffic in the logs
        });

        var mailOptions = {
          to: user["local"]["email"],
          from: "example@example.com",
          subject: "Password change request",
          text:
            "Hi" +
            user.username +
            "\n" +
            "Please click on the following link" +
            "http://" +
            process.env.CLIENT_HOST +
            "/change_password?token=" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          res.send({ status: "Email sent" });
          done(err, "done");
        });
      }
    ],
    function(err) {
      if (err) return next(err);
      res.send({ err: err });
    }
  );
};