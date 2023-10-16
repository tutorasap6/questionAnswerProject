const { sendGmail } = require("../controllers/emailController");
const {resetpassword} = require("../controllers/emailController");
const router = require("express").Router();

router.post("/send-email", sendGmail);
router.post("/reset-email", resetpassword);



module.exports = router;
