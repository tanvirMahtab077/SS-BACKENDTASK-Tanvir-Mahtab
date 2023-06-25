const router = require("express").Router();
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/refreshToken", refreshToken);
router.post("/logout", logout);

module.exports = router;
