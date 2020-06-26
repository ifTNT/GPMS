var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var stylus = require("stylus");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var indexRouter = require("./routes/index");
var uisRouter = require("./routes/UIS");
var icsRouter = require("./routes/ICS");
var episRouter = require("./routes/EPIS");
var fsRouter = require("./routes/FS");
var msRouter = require("./routes/MS");
var db = require("./db");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "afwfdpfkpaokwefn-9gj0irntjolwaefmiowekeafek",
    store: new MongoStore({ url: "mongodb://localhost/GPMS_db" }),
    cookie: { maxAge: 60 * 1000 },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(stylus.middleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/uis", uisRouter);
app.use("/ics", icsRouter);
app.use("/epis", episRouter);
app.use("/ms", msRouter);
app.use("/fs", fsRouter);

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
