import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import cloudinary from "../lib/cloudinary.js";

export const signin = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({msg:"User not found"})
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        if(isMatch){
            generateToken(user._id,res);
            res.status(200).json({message:"User logged in successfully"});
        }
    } catch (error) {
        console.log(error);
        res.json({message:"invalid credentials"})
        console.log("authcontrollerlo login");
    }
};

export const signup = async (req,res)=>{
    try {
        const {fullName,email,password} = req.body;
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }
        if(!email){
            return res.status(400).json({message:"invalid or no email present"})
        }
        if(!fullName){
            return res.status(400).json({message:"invalid or no Name present"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists try Logging in"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            fullName : fullName,
            email : email,
            password : hashedPassword
        });
        
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({message:"User registered successfully"});
        }else{
            res.status(400).json({message:"Invalid user data"});
        }
    } catch (error) {
        console.log(error);
        console.log("error in authController.js");
    }
};

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"user logged out"})
    } catch (error) {
        console.log(error);
        console.log('logout error in authController.js');
    }
};

export const updateProfile = async(req,res)=>{
   try {
    const {profilePic} = req.body;
    const userId = req.user._id
    if(!profilePic){
       return res.status(400).json({message:"profile pic missing!"})
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
    res.status(200).json(updatedUser);
   } catch (error) {
    console.log(error.message);
    console.log('profile updation failed in authController.js');
   }
}

export const checkAuth = (req,res)=>{
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
