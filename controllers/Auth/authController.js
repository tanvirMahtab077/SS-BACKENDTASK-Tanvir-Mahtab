const User = require("../../model/User");
var validator = require("email-validator");

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
    if (findUser.length === 0) {
      const user = await User.create({
        userName,
        email,
        password,
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
    if (!user) {
      return res.status(401).json({
        message: "User not found. Please Register....",
      });
    }
    if (user.email !== email || user.password !== password) {
      return res.status(400).json({
        message: "Email or password doesn't macth.Please try again....",
      });
    }
    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "An error occurred",
      error: err.message,
    });
  }
};

exports.updateRole = async (req, res, next) => {
  const { role, email } = req.body;
  
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
