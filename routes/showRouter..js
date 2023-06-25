const router = require("express").Router();
const {
  addShow,
  findAllShow,
  findShowById,
} = require("../controllers/showController");
const { addCastAndCrews } = require("../middleware/addCastAndCrews");
const { adminAuth } = require("../middleware/auth");

router.post("/add",adminAuth(["admin","creator"]), addCastAndCrews, addShow);
router.get("/all", findAllShow);
router.get("/findOne", findShowById);

module.exports = router;
