const {
  login,
  register,
  getAllUsers,
  acceptUser,
  getUser,
  forgetPassword,
  reset
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers", getAllUsers);
router.get("/changeState/:id", acceptUser);
router.get("/", getUser);
// router.post("/foregetpassword", forgetPassword);
router.post("/reset", reset);


module.exports = router;

