// Import the mongoose module
const mongoose = require("mongoose");

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1:27017/inoteDb";

const connectToMongo = async () => {
  try {
      const conn = await mongoose.connect(mongoDB);
      console.log(`Connected to Mongo Successfully ${conn.connection.host}`);
  } catch (err) {
      console.error("Error connecting to MongoDB: ", err);
  }
}

module.exports = connectToMongo;