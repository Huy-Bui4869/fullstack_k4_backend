require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//setup
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const expressEjsLayout = require("express-ejs-layouts");
const port = 3000;
const hostname = "localhost";
const passport = require("passport");
const passportLocal = require("./passports/passport.local");
const passportGoogle = require("./passports/passport.google");
const { User } = require("./models/index");
const authMiddleware = require("./middlewares/auth.middleware");
const validateMiddleware = require("./middlewares/validate.middleware");

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

var app = express();
// console.log(process.env.DB_HOST); //localhost

//** Cấu hình template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//1. Cầu hình layout
//=>npm i express-ejs-layouts
app.use(expressEjsLayout);

app.use(logger("dev"));
//** Cấu hình đọc dữ liệu ở body. repuest
//--> Đọc body ở dạng application/json
app.use(express.json());
//--> Đọc body ở dạng application/x-www-urlencoded
app.use(express.urlencoded({ extended: false }));
//** Cầu hình đọc cookie
//cài gói hỗ trợ: npm install cookie-parser
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//2. Cấu hình session
//=>> npm install express-session
app.use(
  session({
    // name: "f8_sesion",
    secret: "422987eb04673643936027c2526543d1e2d987ccd4643b048192e8a8be9c77ae",
    resave: false,
    saveUninitialized: true,
  })
);

//3. Cấu hình flash _ gọi sau phần session.
//=>> npm i connect-flash
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id); //lưu user vào session
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findByPk(id); //Truy vấn tới database trả về thông tin user.
  done(null, user);
});

//passport.use('tenLocal', "linkImport")
passport.use("local", passportLocal);
passport.use("google", passportGoogle);

//tất cả request chạy qua middleware.
app.use(validateMiddleware);

//** Routing
app.use("/auth", authRouter);
app.use(authMiddleware);
app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.listen(port, hostname, () => {
  //trả về trạng thái.
  console.log(`chạy server thành công: http://localhost:3000`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
