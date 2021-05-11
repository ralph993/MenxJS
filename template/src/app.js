const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes-------------------------------------------------
const indexRouter = require("./api/index/index.route");

app.use("/", indexRouter);

if (process.env.NODE_ENV === "production") {
  app.get("*", (_, res) => {
    app.use(express.static(path.join(__dirname, "public")));
    res.sendFile(path.resolve(__dirname, "public"));
  });
}

module.exports = app;
