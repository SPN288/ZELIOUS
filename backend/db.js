require("dotenv").config();

const mongoose = require('mongoose');



const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;

    const itemscollection = db.collection("food_items");
    const itemdata = await itemscollection.find({}).toArray();
    //console.log(data);
    global.food_items=itemdata;
    //console.log(global.food_items);

    const categorycollection = db.collection("foodCategory");
    const categorydata = await categorycollection.find({}).toArray();
    global.food_category=categorydata;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;