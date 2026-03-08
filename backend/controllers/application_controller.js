import { Application } from "../models/application_model.js"
import { Job } from "../models/job_model.js"
import { sendMail } from "../util/SendMail.js"

export const applyJob = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        }

        const alreadyApllyed = await Application.findOne({ job: jobId, applicant: userId })
        if (alreadyApllyed) {
            return res.status(400).json({
                message: "You already apply for this job.",
                success: false
            })
        }

        // check if job exist
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id)
        await job.save()
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        })
        if (!application) {
            return res.status(404).json({
                message: "No Applications.",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        })
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
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

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicationId = req.params.id

        if (!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            })
        }

        //find the application by aplicant id
        const application = await Application.findOne({ _id: applicationId })
        if (!application) {
            return res.status(404).json({
                message: "application not found",
                success: false
            })
        }
        
        application.status = status
        await application.save()

        return res.status(200).json({
            message: "Status updated sucessfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getRecruiterApplications = async (req, res) => {
    try {
        const recruiterId = req.id;
        const jobs = await Job.find({ createdby: recruiterId })
            .populate({
                path: "applications",
                options: { sort: { createdAt: -1 } },
                populate: { path: "applicant" }
            })
            .populate({ path: "company" });

        // Flatten into a single array with job/company info attached
        const allApplications = [];
        jobs.forEach(job => {
            job.applications.forEach(app => {
                allApplications.push({
                    _id: app._id,
                    applicant: app.applicant,
                    status: app.status,
                    createdAt: app.createdAt,
                    job: {
                        _id: job._id,
                        title: job.title,
                    },
                    company: {
                        name: job.company?.name,
                    }
                });
            });
        });

        return res.status(200).json({
            applications: allApplications,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// mail controller
export const sendInterviewEmail = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { companyName, address, date, time, message } = req.body;

        const application = await Application.findById(applicationId)
            .populate("applicant")
            .populate({
                path: "job",
                populate: { path: "company" }
            });

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        const fullname = application.applicant.fullname;
        const email = application.applicant.email;
        const jobTitle = application.job.title;

        const htmlTemplate = `
<div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:2px;">
  <div style="max-width:600px; width:100%; margin:0 auto; background:white; padding:15px; border-radius:8px; box-sizing:border-box;">
    
    <h2 style="color:#2c3e50; text-align:center; font-size:22px;">Interview Invitation</h2>

    <p>Dear <strong>${fullname}</strong>,</p>

    <p>
      Congratulations! You have been shortlisted for the position of 
      <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.
    </p>

    <div style="background:#eef2ff; padding:15px; border-radius:6px; margin:20px 0;">
      <h3 style="margin:0 0 10px 0; font-size:16px;">Interview Details</h3>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Location:</strong><br/> ${address}</p>
    </div>

    ${message ? `<p>${message.replace(/\n/g, '<br/>')}</p>` : ''}

    <br/>
    <p>Best Regards,</p>
    <p><strong>${companyName}</strong></p>

    <hr style="margin-top:20px;" />
    <small style="color:gray;">This email was sent via HireHub Recruitment System.</small>
  </div>
</div>
`;

        await sendMail(
            email,
            `Interview Invitation from ${companyName}`,
            htmlTemplate
        );

        return res.status(200).json({
            message: "Interview email sent successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};