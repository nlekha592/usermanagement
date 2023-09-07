const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongodbUrl=process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports=connectDB;