const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;

  return obj;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};
// 추가적으로 토큰이 만료되는 것을 고려하고 또한 누군가 토큰을 훔쳐갈 수 있는 이슈를 방지하기 위해 토큰은 계속 바꿔주는 것이 좋다.

const User = mongoose.model("User", userSchema);

module.exports = User;
