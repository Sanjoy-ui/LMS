import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser, updateProfile } from "../controllers/userController.js"
import upload from "../middleware/multer.js"

const userRoute = express.Router()

userRoute.get("/getcurrentuser" , isAuth , getCurrentUser)
userRoute.post("/profile", isAuth , upload.single("photoUrl"), updateProfile)

export default userRoute;