const router = require("express").Router();
const {
  register,
  login,
  updateRole,
  deleteUser,
} = require("../controllers/Auth/authController");

router.post("/register", register);
router.post("/login", login);
router.patch("/update", updateRole);
router.delete("/delete", deleteUser);

module.exports = router;
