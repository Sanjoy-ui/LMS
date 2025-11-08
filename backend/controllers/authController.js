import User from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";

export const signUp = async (req , res)=>{
    try {
        const {name , email , password , role }= req.body;
        let existUser = await User.findOne({email})
        if (existUser) {
            return res.status(400).json({message : "User already exists"} )
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message : "Enter valid email"})
        }
        if (password.length < 8 ) {
            return res.status(400).json({message : "Enter strong password"})
        }
        let hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password :hashPassword,
            role
        })
        let token = await genToken(user._id)
        res.cookie("token", token , {
            httpOnly : true,
            secure : false,
            sameSite : "Strict",
            maxAge : 7*24*60*60*1000
        });

        res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message : `Signup Error ${error}`})
    }
}

export const googleSignUp = async (req, res) => {
    try {
        const { name, email, photoUrl, role } = req.body;
        
        // Check if user already exists
        let user = await User.findOne({ email });
        
        if (user) {
            // User exists, just login
            let token = await genToken(user._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json(user);
        }
        
        // Create new user (no password needed for Google auth)
        user = await User.create({
            name,
            email,
            photoUrl: photoUrl || "",
            role,
            password: "" // Google users don't have passwords
        });
        
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Google Signup Error: ${error}` });
    }
}



export const login = async (req, res)=>{
    try {
        const {email , password } = req.body;
        let user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({message : "User does not exist Sign up first"})
        }
        let isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch) {
            return res.status(404).json({message : "Incorrect password"})
        }
        let token = await genToken(user._id)
        res.cookie("token", token , {
            httpOnly : true,
            secure : false,
            sameSite : "Strict",
            maxAge : 7*24*60*60*1000
        });

        res.status(200).json(user)
    } catch (error) {
                return res.status(500).json({message : `Login Error ${error}`})

    }
}


export const logOut =async (req,res)=>{
    try {
        await res.clearCookie("token")
        return res.status(200).json({message : "logout Successful"})
    } catch (error) {
         return res.status(500).json({message : `logout Error ${error}`});
    }
}


export const sendOtp = async (req , res) => {
        try {
            const {email} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: "user not found"})
            }
            const otp = Math.floor(1000 + Math.random()*9000).toString()
            user.resetOtp = otp;
            user.otpExpires = Date.now() + 5 *60*1000;
            user.isOptVerified = false;

            await user.save()
            await sendMail(email,otp)
            return res.status(200).json({message:"otp Send Successfully"})
        } catch (error) {
             return res.status(500).json({message : `Otp Send Error ${error}`});
        }
}


export const verifyOtp = async (req,res) => {
    try {
        const {email , otp } = req.body ;
        const user = await User.findOne({email})
            if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
                return res.status(404).json({message: "Invalid otp"})
            }
            
            user.isOptVerified = true;
            user.resetOtp = undefined;
            user.otpExpires = undefined;
            await user.save()
            return res.status(200).json({message:"otp verified Successfully"})

    } catch (error) {
        return res.status(500).json({message : `Otp verify Error ${error}`});
    }
}

export const resetPassword = async (req, res) => {
        try {
            const { email , newPassword } = req.body
            const user = await User.findOne({email})
            if (!user || !user.isOptVerified ) {
                return res.status(404).json({message: "Otp vericifation Required "})
            }
            const hashPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashPassword;
            user.isOptVerified = false;
            await user.save()
            return res.status(200).json({message:"Reset password Successfully"})
        } catch (error) {
            return res.status(500).json({message : `reset password Error ${error}`});
        }
}