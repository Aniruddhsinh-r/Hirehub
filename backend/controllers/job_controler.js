import { response } from "express";
import { Job } from "../models/job_model.js";

export const postJob = async (req,res) => {
    try {
        const {title, description, requirement, salary, experience, location, jobType, position, companyId} = req.body
        const userId = req.id

        if (!title || !description || !requirement || !salary || experience == null || !location || !jobType || !position || !companyId) {
            return res.status(400).json({
                message: "Something went wrong",
                success: false
            })
        }

        const job = await Job.create({
            title, 
            description, 
            requirement: requirement.split(","), 
            salary:Number(salary), 
            location, 
            jobType, 
            experienceLevel:experience, 
            position, 
            company: companyId, 
            createdby: userId, 
        })
        return res.status(201).json({
            message:"New job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        }

        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt: -1})
        if (!jobs) {
            return res.status(400).json({
                message:"Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req,res) => {
    try {
        const jobid = req.params.id
        const job = await Job.findById(jobid).populate({
            path:"applications"
        })
        if (!job) {
            return res.status(400).json({
                message:"Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
} 

export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id
        const jobs = await Job.find({createdby:adminId}).populate({
            path:'company',
            createdAt: -1
        })
        if (!jobs) {
            return res.status(400).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// controllers/job_controller.js
import { User } from "../models/user_model.js";

export const saveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found", success: false });

        const isSaved = user.savedJobs.includes(jobId);

        if (isSaved) {
            // If already saved, remove it.
            user.savedJobs.pull(jobId);
        } else {
            // Otherwise, add it
            user.savedJobs.push(jobId);
        }

        await user.save();
        return res.status(200).json({
            message: isSaved ? "Job removed from saved" : "Job saved successfully",
            success: true,
            savedJobs: user.savedJobs
        });
    } catch (error) {
        console.log(error);
    }
};

// Get all saved jobs for the logged-in user
export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).populate({
            path: 'savedJobs',
            populate: { path: 'company' } // To show company info in cards
        });

        return res.status(200).json({
            savedJobs: user.savedJobs,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};