const { string } = require("yup");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const sendMail = require("../utils/mail");

module.exports = {
  resetPassword: (req, res) => {
    const { token } = req.query;
    const error = req.errors.password;
    const errorConfirm = req.errors.confirmPassword;

    const user = User.findOne({
      where: { reset_token: token },
    });

    if (new Date().getTime() > user.expired_token) {
      res.render("auth/notification");
    } else {
      res.render("auth/resetPassword", { error, errorConfirm });
    }
  },

  handleResetPassword: async (req, res) => {
    const { password } = req.body;
    const { token } = req.query;

    const body = await req.validate(req.body, {
      password: string()
        .required("bắt buộc phải nhập mật khẩu")
        .min(8, "mật khẩu phải từ 8 ký tự trở lên")
        .required("Vui lòng nhập password"),
      confirmPassword: string()
        .required("vui lòng nhập lại mật khẩu")
        .test("check-password", "mật khẩu không trùng khớp", (confirm) => {
          if (confirm === password) {
            return true;
          }
          return false;
        }),
    });

    if (body) {
      const users = await User.findOne({
        where: { reset_token: token },
      });

      if (users.expired_token < new Date().getTime()) {
        return res.render("auth/notification");
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const status = await User.update(
        {
          password: hashPassword,
          reset_token: null,
          expired_token: null,
        },
        {
          where: { id: users.id },
        }
      );

      console.log("check status", status);
      const info = await sendMail(
        users.email,
        "thay đổi mật khẩu",
        "Thay đổi mật khẩu thành công"
      );

      res.redirect("/auth/login");
    }
  },
};
