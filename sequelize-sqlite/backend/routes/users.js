var express = require("express");
var router = express.Router();
var models = require("../models/");

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
      res.send("Inserted.")
    })
    .catch(err => {
      console.error("エラーでした:", err);
    });
});

module.exports = router;
