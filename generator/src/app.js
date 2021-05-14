import express from "express";
import chalk from "chalk";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

for (const route of routes) {
  app.use(route.path, route.component);
}

if (process.env.NODE_ENV === "production") {
  app.get("*", (_, res) => {
    app.use(express.static(path.join(__dirname, "public")));
    res.sendFile(path.resolve(__dirname, "public"));
  });
}

app.listen(
  process.env.PORT || "5000",
  console.log(
    `%s App listening port: ${process.env.PORT || "5000"}`,
    chalk.greenBright.bold("✔")
  )
);
