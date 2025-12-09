import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import cors from "cors"
import userRoute from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
dotenv.config()

const app = express();
const port= process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials : true
}))

app.use("/api/auth", authRouter)
app.use("/api/user" , userRoute)
app.use("/api/course" , courseRouter)

app.get("/",(req,res)=>{
    res.send("shh")
})

app.listen(port , ()=>{
    connectDB();
    console.log(`Server running on ${port} `);
    
})