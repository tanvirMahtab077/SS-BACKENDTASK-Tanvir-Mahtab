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
  if (userName.length === 0) {
    return res.status(400).json({ message: "User name is required" });
  }
  if (isValidEmail === false) {
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
