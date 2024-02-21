const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const HttpError = require("../utils/HttpError");

const signupController = async (req, res, next) => {
    const { name, password } = req.body;

    //회원가입 시 유효성 검사.

    const existingUsers = await User.find({ name });

    if (existingUsers.length > 0) {
        const error = new HttpError(422, "이미 가입된 이름입니다.");
        return next(error);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY);

    return res.status(201).json({ message: "회원가입에 성공했습니다.", token });
};

const loginController = async (req, res, next) => {
    const { name, password } = req.body;

    const enteredUser = await User.findOne({ name });

    if (!enteredUser) {
        const error = new HttpError(404, "가입되지 않은 이름입니다.");
        return next(error);
    }

    const isMatched = await bcrypt.compare(password, enteredUser.password);

    if (!isMatched) {
        const error = new HttpError(422, "비밀번호가 일치하지 않습니다.");
        return next(error);
    }

    const token = jwt.sign({ userId: enteredUser._id }, process.env.JWT_KEY);

    return res.status(201).json({ message: "로그인에 성공했습니다.", token });
};

module.exports = { signupController, loginController };
