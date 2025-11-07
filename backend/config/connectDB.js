import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Db connected");
    } catch (error) {
        console.log("db not connected")
    }
}

export default connectDB