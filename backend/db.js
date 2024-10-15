require("dotenv").config();

const mongoose = require('mongoose');



const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("Connected to MongoDB");

    // const db = mongoose.connection.db;
    // const collection = db.collection("food_items"); // Replace with your collection name

    // const data = await collection.find({}).toArray();
    // console.log(data);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;