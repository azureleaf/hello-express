const express = require("express");
const router = express.Router();
const users_controller = require("../controllers/users.controller");

//auth not required
router.post("/users/login",  users_controller.login);
router.post("/users/signup", users_controller.signup);
router.post(
  "/users/change_password",
  users_controller.change_password
);
router.post(
  "/users/forgot_password",
  users_controller.forgot_password
);
router.post("/users/logout", auth.required, users_controller.logout);

module.exports = router;