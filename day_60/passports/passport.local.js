//imporrt models để viết truy vấn
const { User } = require("../models/index");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      //done('objError', 'thongTinUsser', 'option.message: thông báo')
      return done(null, false, {
        message: "Tài khoản không tồn tại",
      });
    }
    const result = bcrypt.compareSync(password, user.password);

    if (!result) {
      return done(null, false, {
        message: "Mật khẩu không chính xác",
      });
    }

    return done(null, user);
  }
);

//Gọi vào file app
