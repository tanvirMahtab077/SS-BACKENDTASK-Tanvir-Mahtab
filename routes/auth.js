const router = require("express").Router();
const { register, login, updateRole } = require("../controllers/Auth/authController");

router.post("/register", register);
router.post("/login", login);
router.patch("/update", updateRole);

module.exports = router;
