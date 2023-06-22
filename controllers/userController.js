const User = require("../model/User");

exports.userList = async (req,res,next)=>{
  try{
    const users = await User.find();
    res.status(200).json({users})
    
  }catch(err){
    console.error(err);
    res.status(400).json({ message: "An error occurred", error: err.message });
  }
}

exports.updateRole = async (req, res, next) => {
  const { role, email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (user.role !== "admin") {
      await User.updateOne({ email }, { role });
      res.status(200).json({ message: "Update successful" });
    } else {
      res
        .status(400)
        .json({ message: "User is an Admin.Admin can't be update..." });
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