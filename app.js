const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter); // /api를 해주면 각 주소 앞에 /api가 붙는다 ex) /api/tasks 블라블라

const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    // 실패 시 오류메세지 코드
    console.log("DB connection fail", err);
  });
// useNewUrlParser 은  mongodb 형태가 약간 다르다 옛날과 요즘 형식이 다른 부분을 요즘 형식도 잘 나올 수 있게 해달라는 코드

app.listen(5000, () => {
  console.log("server on 5000");
});

