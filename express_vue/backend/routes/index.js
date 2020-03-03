var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test", function(req, res, next) {
  res.render("index", { title: "OK, now you accessed to /test" });
});

router.post("/test", function(req, res, next) {
  // res.send(req.body.text);
  res.render("index", { title: req.body.text });
});

module.exports = router;
