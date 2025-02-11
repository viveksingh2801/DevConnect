const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vivek280197:SO3YbfOd7acCG3Kd@cluster0.4goh4.mongodb.net/devConnect"
  );
};

module.exports = connectDB;


