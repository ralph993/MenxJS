if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");

const connectDB = () => {
  try {
    const uri = "mongodb://localhost:27017/41Street";
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB connection established good".brightCyan);
    });
  } catch (error) {
    console.log(error.red);
  }
};

module.exports = connectDB;
