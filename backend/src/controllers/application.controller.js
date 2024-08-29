import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Application } from "../models/application.model.js";

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
    })

    // if job is present, create application
    // push to the application array
 });

export { ApplyJob }