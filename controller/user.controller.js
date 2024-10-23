const User = require("../model/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email }); // 이메일 이미 가입된 유무 확인 (findOne) 을 활용해서 찾아준다.
    if (user) {
      throw new Eroor("이미 가입이 된 유저 입니다.");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
    console.log("hash", hash);
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v"); // 이메일이 맞는지 여부 묻기
    if (user) {
      // 맞다면 비밀번호 일치여부 확인
      const isMath = bcrypt.compareSync(password, user.password); // 사용자가 입력한 패스워드와 디비에 암호화된 비밀번호 비교 코드
      if (isMath) {
        // 맞으면 토큰 발행
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.getUser = async (req,res) => {
  try {
    
  } catch(error) {
    res.status(400).json({ status:"fail", message: error.message })
  }
}

module.exports = userController;

// 미들웨어
