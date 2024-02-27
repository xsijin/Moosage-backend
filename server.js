var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors');

var securityMiddleware = require('./middlewares/security');

require("dotenv").config();
require("./client/mongo");

var usersRouter = require("./routes/users");
var boardsRouter = require("./routes/boards");
var moosagesRouter = require("./routes/moosages");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(securityMiddleware.checkJWT);

app.use("/users", usersRouter);
app.use("/boards", boardsRouter);
app.use("/moosages", moosagesRouter);

module.exports = app;
