import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { syncIndexes } from "mongoose";
import cloudinary from "../util/cloudinary.js";
import getDataUri from "../util/dataUri.js";
// import { use } from "react";

export const register = async (req,res) => {
    try {
        const {fullname,email,phoneNo,password,role} = req.body
        
        if (!fullname || !email || !phoneNo || !password || !role) {
            return res.status(400).json({
                message:"something went wrong.",
                success:false
            })
        }

        const file = req.file;
        const fileUri = getDataUri(file)
        const cloudResponse = cloudinary.uploader.upload(fileUri.content)

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({
                message:"User already exist with this email",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            email,
            phoneNo,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:(await cloudResponse).secure_url,
            }
        })

        return res.status(201).json({
            message:"Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
        if (error) {
            return res.status(500).json({
                message: "server error",
                success: false
            })
        }
    }
}

export const login = async (req,res) => {
    try {
        const {email,password,role} = req.body
        console.log(email,password,role);

        if(!email || !password || !role){
            return res.status(400).json({
                message:"something went wrong.",
                success: false
            })
        }

        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Email or password.",
                success: false
            });
        }
        let passwordmetch = await bcrypt.compare(password, user.password)
        if (!passwordmetch) {
            return res.status(400).json({
                message:"Incorrect Email or password.",
                success: false
            })
        }

        if (role !== user.role) {
            return res.status(400).json({
                message:"Account dosen't exist with this role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNo: user.phoneNo,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge: 1 * 24 * 60 * 60 * 1000 ,httpOnly:true ,sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token", "",{maxAge: 0}).json({
            message:"Loged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {fullname,email,phoneNo,bio,skills} = req.body
        const file = req.file;

        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "auto",
            format: "png", // Force the output to be a PNG image
        })

        let skillsArray;

        if(skills){
            skillsArray = skills.split(",")
        }

        const userId = req.id
        let user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNo) user.phoneNo = phoneNo
        if (bio) user.profile.bio = bio
        if (skillsArray) user.profile.skills = skillsArray

        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }
        // user.fullname = fullname,
        // user.email = email,
        // user.phoneNo = phoneNo,
        // user.profile.bio = bio,
        // user.profile.skills = skillsArray

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNo: user.phoneNo,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile update successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Faile to update profile",
            success: false
        });
        
    }
}