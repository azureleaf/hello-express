var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "Login Page", user: req.user});
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});



router.post('/login', passport.authenticate('local', 
    {successRedirect: '/',
    failureRedirect: '/login',
    session: false}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
