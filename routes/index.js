const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api");

router.use("/tasks", taskApi); // /tasks 주소로 시작이 된다면 무조건 taskApi로 넘어가게 설정
router.use("/user", userApi);


module.exports = router;
