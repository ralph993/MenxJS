import mongoose from "mongoose";
import chalk from "chalk";

export default async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/api";
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log(
        "%s MongoDB connection established",
        chalk.greenBright.bold("✔")
      );
    });
  } catch (error) {
    console.log("%s0" + error, chalk.redBright.bold("ERROR"));
  }
}
