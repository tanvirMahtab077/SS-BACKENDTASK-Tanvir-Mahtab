const router = require("express").Router();
const {
  updateRole,
  deleteUser,
  userList,
} = require("../controllers/userController");

const { adminAuth } = require("../middleware/auth");

router.get("/list", adminAuth(["admin"]), userList);
router.patch("/updateRole", adminAuth(["admin"]), updateRole);
router.delete("/delete", adminAuth(["admin"]), deleteUser);

module.exports = router;
