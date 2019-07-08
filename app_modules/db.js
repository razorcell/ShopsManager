const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Mongoo DB connected...");
  } catch (err) {
    console.log(err.message);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

module.exports = connectDB;
