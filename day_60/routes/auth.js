const express = require("express");
const router = express.Router();
const passport = require("passport");
const { error } = require("../passports/passport.local");

const authController = require("../controllers/auth.controller");
const forgotPassController = require("../controllers/forgotPass.controller");
const resetPassController = require("../controllers/resetPass.controller");

//Đăng nhập bằng tk.
router.get("/login", authController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    //nếu fail chuyển hướng về trang login.
    failureRedirect: "login",
    failureFlash: true,
    //Khi nhập thiếu email hoặc password.
    badRequestMessage: "Vui lòng nhập email và mật khẩu",
    //Chuyển hướng về trang chủ nếu đăng nhập thành công.
    successRedirect: "/",
  })
);

// Đăng nhập bằng google.
router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureFlash: true,
    failureRedirect: "auth/login",
    //Chuyển hướng về trang chủ nếu đăng nhập thành công.
    successRedirect: "/",
  })
);

// form logout
router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (!error) {
      return res.redirect("/auth/login");
    }
  });
});

// form quên mật khẩu
router.get("/forgot-password", forgotPassController.forgotPassword);
router.post("/forgot-password", forgotPassController.handleForgotPassword);

// form đổi mật khẩu
router.get("/reset-password", resetPassController.resetPassword);
router.post("/reset-password", resetPassController.handleResetPassword);

module.exports = router;
