require("dotenv").config();
const express = require("express");
const expressEjsLayout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const port = 3000;
const hostname = "localhost";

var createError = require("http-errors");
// var express = require("express");
var path = require("path");
// var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// const { hostname } = require("os");

var app = express();

//1. Cấu hình template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//2. Cầu hình layout
//=>npm i express-ejs-layouts
app.use(expressEjsLayout);

app.use(logger("dev"));

//3. Cấu hình đọc dữ liệu ở body. repuest
//--> Đọc body ở dạng application/json
app.use(express.json());
//--> Đọc body ở dạng application/x-www-urlencoded
app.use(express.urlencoded({ extended: false }));

//4. Cầu hình đọc cookie
//cài gói hỗ trợ: npm install cookie-parser
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

//5. Cấu hình session
//=>> npm install express-session
app.use(
  session({
    name: "f8_sesion",
    secret: "422987eb04673643936027c2526543d1e2d987ccd4643b048192e8a8be9c77ae",
    resave: false,
    saveUninitialized: true,
  })
);

//6. Gọi sau phần session.
//=>> npm i connect-flash
app.use(flash());

//4. Routing
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, hostname, () => {
  //trả về trạng thái.
  console.log(`chạy server thành công: http://${hostname}:${port}`);
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
