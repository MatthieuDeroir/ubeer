const mongoose = require('mongoose');
require("dotenv").config();

const uri = process.env.ATLAS_URI || "mongodb+srv://mderoir:mderoir@beer-app.32q1jor.mongodb.net/?retryWrites=true&w=majority&appName=beer-app";

const connectMongo = async () => {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000, // 45 seconds
            connectTimeoutMS: 30000, // 30 seconds
        });
        console.log("Connected successfully to Mongo server");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

module.exports = { connectMongo };
