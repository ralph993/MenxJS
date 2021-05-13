const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
for (const route of routes) {
  app.use(route.path, route.component);
}

if (process.env.NODE_ENV === "production") {
  app.get("*", (_, res) => {
    app.use(express.static(path.join(__dirname, "public")));
    res.sendFile(path.resolve(__dirname, "public"));
  });
}

module.exports = app;
