const sendMail = require("../utils/mail");
const { Mail } = require("../models/index");
const { getDates } = require("../utils/time");

module.exports = {
  index: (req, res) => {
    res.render("index");
  },

  send: (req, res) => {
    const msg = req.flash("msg");
    res.render("mail/send", { msg });
  },

  handleSend: async (req, res) => {
    const { email, title, description } = req.body;
    // console.log(info);
    const info = await sendMail(email, title, description);

    const addEmail = await Mail.create({
      from: info.envelope.from,
      to: info.accepted[0],
      title,
      description,
      status: false,
    });

    if (addEmail) {
      req.flash("msg", "Gửi email thành công");
    }

    return res.redirect("/send");
  },

  history: async (req, res) => {
    const value = await Mail.findAll({
      order: [["created_at", "desc"]],
    });
    res.render("mail/history", { value, getDates });
  },

  details: async (req, res, next) => {
    const { id } = req.params;
    try {
      const mails = await Mail.findByPk(id);

      res.render("mail/mailDetail", { mails });
    } catch (e) {
      return next(e);
    }
  },
};
