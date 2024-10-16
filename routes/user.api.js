const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

// 1. 회원가입 endPoint
router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);

// 토큰을 통해 유저 id 빼내고 => 그 아이디로 유저 객체 찾아서 보내주기
router.get("/me", authController.authenticate); // 유저랑도 관련됐지만 권한과 관련되어 있어서 따로 만들어주기

module.exports = router;
