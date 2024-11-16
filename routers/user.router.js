const express = require("express");
const { loginUser, registerUser, getUsers } = require("../controller/user.controller");
const router = express.Router();

router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/").get(getUsers)

module.exports = router;