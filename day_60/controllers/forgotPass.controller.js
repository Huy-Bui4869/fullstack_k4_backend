//Quên mật khẩu
const { string } = require("yup");
const md5 = require("md5");
const { User } = require("../models/index");
const sendMail = require("../utils/mail");

module.exports = {
  forgotPassword: (req, res) => {
    const error = req.errors.email;
    const success = req.flash("success");
    res.render("auth/forgotPassword", { error, success });
  },

  handleForgotPassword: async (req, res) => {
    const body = await req.validate(req.body, {
      //email => thuộc tình name của input.
      email: string()
        .required("email bắt buộc phải nhập")
        .email("Nhập đúng định dạng email")
        .test(
          "check-unique",
          "email không tồn tại trong hệ thống",
          // hàm return false => báo lỗi
          async (value) => {
            return await User.findOne({
              where: { email: value },
            });
          }
        )
        .test(
          "check-provider",
          "email đã được đăng ký bằng google",
          async (value) => {
            return await User.findOne({
              where: {
                email: value,
                provider_id: null,
              },
            });
          }
        ),
    });

    if (body) {
      //Tạo token và thời gian hết hạn (15p)
      const token = md5(Math.random() + new Date().getTime());
      const expiredIoken = new Date().getTime() + 15 * 60 * 1000;

      await User.update(
        {
          reset_token: token,
          expired_token: expiredIoken,
        },
        {
          where: { email: body.email },
        }
      );
      const link = `http://localhost:3000/auth/reset-password?token=${token}`;
      console.log("link reset-password", link);

      const info = await sendMail(
        body.email,
        "thay đổi mật khẩu",
        `Bấm vào link này để thay đổi mật khẩu: ${link}`
      );
      if (!info) {
        // req.flash("errors", "có lỗi xảy ra vui lòng thử lại");
        req.errors.email = "có lỗi xảy ra vui lòng thử lại";
      }
      req.flash("success", "Vui lòng kiểm tra mail để đổi mật khẩu");
    }

    res.redirect("/auth/forgot-password");
  },
};
