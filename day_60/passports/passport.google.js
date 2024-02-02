const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User, Provider } = require("../models/index");
const provider = require("../models/provider");

module.exports = new GoogleStrategy(
  {
    clientID:
      "1023736162355-g02hcicjuurfm29kdsgqdecler1qo16n.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ["email", "profile"],
  },

  async (accessToken, referenceToken, profile, done) => {
    const email = profile.emails[0].value;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: profile.displayName,
        email,
        password: null,
        status: true,
      },
    });

    //Lấy id của hình thức đăng nhập.
    const { id: providerId } = await Provider.findOne({
      where: { name: profile.provider },
    });

    //email chưa tồn tại => created: true || email đã tồn tại => created: false
    if (created) {
      //email chưa tồn tại sẽ tạo mới, cập nhật lại provider_id của bản ghi đó.
      await User.update(
        {
          provider_id: providerId,
        },
        {
          where: { id: user.id },
        }
      );
    } else {
      //Nếu tồn tại kiểm tra hình thức đăng nhập, nếu htđn google => success.
      if (user.provider_id !== providerId) {
        return done(null, false, {
          message: "Email đã tồn tại, vui lòng dùng nhập email và password",
        });
      }
    }

    // console.log("thoog tin user", user);
    //done tránh bị treo req
    return done(null, user, {
      message: "success",
    });
  }
);
