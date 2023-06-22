const User = require("../model/User");
var validator = require("email-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const isValidEmail = validator.validate(email);
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be less than 6 characters" });
  }
  if (!userName) {
    return res.status(400).json({ message: "User name is required" });
  }
  if (!isValidEmail) {
    return res.status(400).json({ message: "Email not valid" });
  }
  try {
    const findUser = await User.find({ email });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    if (findUser.length === 0) {
      const user = await User.create({
        userName,
        email,
        password: hashPassword,
      });
      res.status(200).json({
        message: "User successfully created",
      });
    } else {
      res.status(400).json({ message: "User already exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({
      message: "User not created successful",
      error: err.mesage,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  }
  try {
    const user = await User.findOne({ email });
    const maxAge = 3 * 60 * 60;

    if (!user) {
      return res.status(401).json({
        message: "User not found. Please Register....",
      });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, role: user.role },
      process.env.Jwt_SECRET_Key,
      {
        expiresIn: maxAge,
      }
    );

    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
      saemSite: "lax",
    });

    return res.status(200).json({ message: "Successfully Logged In" });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "An error occurred",
      error: err.message,
    });
  }
};
