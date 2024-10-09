require("dotenv").config();
const mongoose = require("mongoose");

exports.dbConnect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DATABASE_URL || "", {});
        console.log("Successfully Connected to database ✨✨ : ", process.env.DATABASE_URL);
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

exports.dbClose = async () => {
    try {
        await mongoose.connection.close();
        console.log("Database connection closed successfully");
    } catch (error) {
        console.error("Error closing database connection:", error);
    }
};