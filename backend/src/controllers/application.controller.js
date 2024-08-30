import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { populate } from "dotenv";

const ApplyJob = asyncHandler(async (req, res) => {
    // check user is loggedIn or not
    if (!req.user) {
        throw new ApiError(401,"User is not loggedIn");
    }
    // check jobId, if present throw error
    if(!req.params.jobId){
        throw new ApiError(500, "JobId is required");
    }
    // check if user already applied for this job
    const existingApplication = await Application.findOne({
        job: req.params.jobId,
        applicant: req.user._id
    });
    if(existingApplication){
        throw new ApiError(400, "You have already applied for this job");
    }
    
    // if job is present, create application
    const job = await Job.findById(req.params.jobId);
    if(!job){
        throw new ApiError(404, "Job not found");
    }

const application = await Application.create({
    job: req.params.jobId,
    applicant: req.user._id,
    status: "pending"
});
    // push to the application array
job.applications.push(application._id);
await job.save();
res.status(201).json(new ApiResponse(201, "Application created successfully", application));
})



const GetApplications = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "User is not loggedIn");
    }

    const applications = await Application.find({ applicant: req.user._id })
        .sort({ createdAt: -1 })
        .populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        });
    if(!applications){
        throw new ApiError(404, "No applications found");
    }
    res.status(200).json(new ApiResponse(200, "Applications fetched successfully", applications));
})
 
const getApplicants = asyncHandler(async (req, res) => {
    if(!req.user){
        throw new ApiError(401, "User is not loggedIn");
    }
    const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
        path: 'applications',
        options: { sort: { createdAt: -1 } },
        populate: {
            path: 'applicant',
            options: { sort: { createdAt: -1 } }
        }
    });
    if(!job){
        throw new ApiError(404, "Job not found");
    }
    res.status(200).json(new ApiResponse(200, "Applicants fetched successfully", {job, applications: job.applications}));
})

const updateApplicationStatus = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "User is not loggedIn");
    }
    const { status } = req.body;
    const applicationId = req.params.applicationId;
    if(!status){
        throw new ApiError(400, "Status is required");
    }
    const application = await Application.findById(applicationId);
    if(!application){
        throw new ApiError(404, "Application not found");
    }
    if(application.status !== "pending"){
        throw new ApiError(400, "Application status is already updated");
    }
    application.status = status.toLowerCase();
    await application.save();

    res.status(200).json(new ApiResponse(200, "Application status updated successfully", application));
})

export { ApplyJob, GetApplications, getApplicants, updateApplicationStatus }