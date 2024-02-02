"use strict";
const nodemailer = require("nodemailer");
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT, //587, 25
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    // user: "huybui2451@gmail.com",
    // pass: "dncr hcbw gjuv dfpf",
    user: EMAIL_USERNAME,
    pass: EMAIL_PASS,
  },
});

module.exports = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: `"F8 Education 👻" <${EMAIL_USERNAME}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html: message, // html body
  });
  return info;
};
