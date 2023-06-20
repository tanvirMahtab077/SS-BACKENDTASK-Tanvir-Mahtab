const User = require("../../model/User");
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
        user,
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
      { id: user._id, userName: user.userName },
      process.env.Jwt_SECRET_Key,
      {
        expiresIn: maxAge,
      }
    );

    res.cookie(user._id, token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
      saemSite: "lax",
    });

    return res
      .status(200)
      .json({ message: "Successfully Logged In", user: user, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "An error occurred",
      error: err.message,
    });
  }
};

exports.updateRole = async (req, res, next) => {
  const { role, email } = req.query;

  if (!role) {
    return res.status(400).json({ message: "Role is not present" });
  }

  try {
    const user = await User.findOne({ email });
    if (user.role !== "admin") {
      await User.updateOne({ role });
      res.status(200).json({ message: "Update successful", user });
    } else {
      res.status(400).json({ message: "User is already an Admin" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "An error occurred", error: err.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    await User.deleteOne({ email });
    res.status(201).json({ message: "User successfully deleted" });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
};
