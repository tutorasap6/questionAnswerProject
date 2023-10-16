const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (validator.isEmpty(email)) {
      return res.json({
        errors: "Email is required.",
        status: false,
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        errors: "Email is invalid.",
        status: false,
      });
    }
    if (validator.isEmpty(password)) {
      return res.json({
        errors: "Password is required.",
        status: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ errors: "Incorrect Email or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ errors: "Incorrect Email or Password", status: false });
    const payload = { id: user._id };
    const token = jwt.sign(payload, "HJS");
    return res.json({ token, status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const errors = "";
    const { username, email, password, confirmPassword } = req.body;
    if (validator.isEmpty(username)) {
      return res.json({
        errors: "User name is required.",
        status: false,
      });
    }
    if (validator.isEmpty(email)) {
      return res.json({
        errors: "Email is required.",
        status: false,
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        errors: "Email is invalid.",
        status: false,
      });
    }
    if (validator.isEmpty(password)) {
      return res.json({
        errors: "Password is required.",
        status: false,
      });
    }

    if (!validator.equals(password, confirmPassword)) {
      return res.json({
        errors: "Password is not matched.",
        status: false,
      });
    }
    console.log(errors, req.body);
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ errors: "Email already used.n", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    const payload = { id: user._id };
    const token = jwt.sign(payload, "HJS");
    return res.json({ token, status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.reset = async (req, res, next) => {
  try {
    const errors = "";
    const {password, confirmPassword, token} = req.body;
    console.log('token', token)
    
    if (validator.isEmpty(password)) {
      return res.json({
        errors: "Password is required.",
        status: false,
      });
    }

    if (!validator.equals(password, confirmPassword)) {
      return res.json({
        errors: "Password is not matched.",
        status: false,
      });
    }
    const user = await User.findOne({ password: token });
    if (!user) {
      return res.json({ errors: "User doesn't exist", status: false });
    }
    console.log(user)
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { password: token },
      { password: hashedPassword },
      { new: true }
    );
    return res.json({status: true });
  } catch (ex) {
    next(ex);
  }
};


module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

// module.exports.forgetPassword = async (req, res, next) => {
  
// }
//   try {
//     console.log("email -> ", req.body.email);

//     const transporter = nodemailer.createTransport({
//       // Configure the email transporter (e.g., Gmail, SMTP server)
//       // ...
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "ngyentuandev@gmail.com",
//         pass: "flztqkcsxpgxgdtc",
//       },
//     });

//     const token = crypto.randomBytes(20).toString("hex"); // Generate a random token

//     // Send the verification email
//     const mailOptions = {
//       from: "chenel@service.com",
//       to: req.body.email,
//       subject: "Email Verification",
//       text: `Click the following link to verify your email: http://localhost:5000/verify-email/${token}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send("Email sending failed.");
//       } else {
//         console.log("Email sent: " + info.response);
//         res.status(200).send("Verification email sent.");
//       }
//     });

//     return res.status(200).json({
//       success: true,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };

module.exports.getUser = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    const payload = jwt.verify(token, "HJS");
    const user = await User.findById(payload.id);
    if (!user) throw "User Not Found";
    return res.json(user);
  } catch (e) {
    return res.status(400).send(e.message)
  }
};

module.exports.acceptUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const usernameCheck = await User.findById(id);
    if (!usernameCheck) {
      return res.status(404).send("User not found");
    }
    if (usernameCheck.state === 0) {
      await User.updateOne({ _id: id }, { $set: { state: 1 } });
      res.send("User accepted");
    } else {
      await User.updateOne({ _id: id }, { $set: { state: 0 } });
      res.send("User rejected");
    }
  } catch (ex) {
    next(ex);
  }
};
