module.exports = {
  login: (req, res) => {
    if (req.user) {
      return res.redirect("/");
    }
    //passport tự tạo 1 flash error
    const error = req.flash("error");
    res.render("auth/login", { error });
  },
};
