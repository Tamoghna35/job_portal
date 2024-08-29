import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/job.model.js";

const createJob = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "User is not loggedIn");
  }

  console.log("req.user in createJob ===>", req.user);

  const {
    title,
    description,
    requirements,
    salary,
    experienceLevel,
    location,
    jobType,
    position,
    companyId,
  } = req.body;
  if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !experienceLevel ||
    !location ||
    !jobType ||
    !position ||
    !companyId
  ) {
    throw new ApiError(500, "All the fields are required");
  }

  const job = await Job.create({
    title,
    description,
    requirements,
    salary,
    experienceLevel,
    location,
    jobType,
    position,
    companyId,
    created_by: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job created successfully"));
});

// This function is for fetching all the jobs for "Studeny"
const getAllJobs = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "User is not loggedIn");
  }

  const query = req.query.keyword
    ? {
        $or: [
          {
            title: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            description: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const jobs = await Job.find(query)
    .populate("created_by", "fullName email")
    .populate("companyId", "name");
  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "All Jobs fetched successfully"));
});

//  This function will check how many jobs are created by Admin

const jobsCreatedByAdmin = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "User is not loggedIn");
  }
  const jobsCreatedByAdmin = await Job.find({ created_by: req.user._id });

  if (jobsCreatedByAdmin.length === 0) {
    throw new ApiError(404, "No jobs created by you");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        jobsCreatedByAdmin,
        "Jobs created by you fetched successfully"
      )
    );
});

const getJobById = asyncHandler(async (req, res) => { 
    const job = await Job.findById(req.params.id)
    if(!job){
        throw new ApiError(404, "Job not found")
    }
    return res.status(200).json(new ApiResponse(200, job, "Job fetched successfully"))
})

export { createJob, getAllJobs, jobsCreatedByAdmin,getJobById };
