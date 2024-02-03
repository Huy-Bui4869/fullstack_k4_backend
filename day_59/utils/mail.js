"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, //587, 25
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "huybui2451@gmail.com",
    pass: "dncr hcbw gjuv dfpf",
  },
  // host: process.env.NM_HOST,
  // port: process.env.NM_PORT, //587, 25
  // secure: true,
  // auth: {
  //   // TODO: replace `user` and `pass` values from <https://forwardemail.net>
  //   user: process.env.NM_USER,
  //   pass: process.env.NM_PASS,
  // },
});

module.exports = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: '"F8 Education 👻" <huybui2451@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html: message, // html body
  });
  return info;
};
