const fs = require("fs");
const path = require("path");
const sendMail = require("../lib/emailSender");
const User = require('../models/userModel');

module.exports.resetpassword = async (req, res) => {

  // verify email=
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  console.log('username', user.username)
 
  const options = {
    to: email,
    // to: "uniquewriters36@gmail.com",
    // cc: 'cc1@example.com, cc2@example.com',
    // replyTo: 'amit@labnol.org',
    subject: "🚀 Reset Password",
    text: "This email is sent from the command line",
    html: `
            <div>
              <p>🙋🏻‍♀️ Do you forgot yourpassword.</p>
              <p>Don't worry</p>
              <a href = "http://127.0.0.1:5000/auth/reset/?token=${user.password}">
                <button>Reset Password</button>
              </a>
            </div>`,
    attachments: null,
    textEncoding: "base64",
    headers: [
      { key: "X-Application-Developer", value: "Amit Agarwal" },
      { key: "X-Application-Version", value: "v1.0.0.2" },
    ],
  };

  sendMail(options)
    .then((messageId) => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "An error occurred" });
    });
};


module.exports.sendGmail = async (req, res) => {
 
  const options = {
    to: "okaylight0730@gmail.com",
    // to: "uniquewriters36@gmail.com",
    // cc: 'cc1@example.com, cc2@example.com',
    // replyTo: 'amit@labnol.org',
    subject: "🚀 New Quote Arrived from dragongold0808@gmail.com",
    text: "This email is sent from the command line",
    html: `<p>🙋🏻‍♀️ ${req.body.name} sent you some quotes.</p><p>He/She offered <b>${req.body.budget}$</b> for the following question.</p>
    <p>His/Her Email address is ${req.body.email}</p>
    <p>He/She said "${req.body.instructions}"</p>
    <p>His/Her Phone number: "${req.body.phone}"</p>
    <p>-------------------------------------</p>
    ${req.body.content}`,
    attachments: null,
    textEncoding: "base64",
    headers: [
      { key: "X-Application-Developer", value: "Amit Agarwal" },
      { key: "X-Application-Version", value: "v1.0.0.2" },
    ],
  };

  sendMail(options)
    .then((messageId) => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "An error occurred" });
    });
};