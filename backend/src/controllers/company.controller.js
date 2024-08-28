import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Company } from "../models/company.model.js"



/*Register new company*/
const registerCompany = asyncHandler(async (req, res) => { 
    if (!req.user) {
        console.log("req.user in company controller ===>", req.user);
        
        throw new ApiError(401, "User is not logged In")
    }
    
    
    const { companyName } = req.body;
    if (!companyName) {
        throw new ApiError(500, "Company name is required")
    }
    console.log("tamoghna");
    const existedCompany = await Company.findOne({ name: companyName })
    console.log("tamoghna1");
    if (existedCompany) {
        throw new ApiError(409, "Company with same name is already exist")
    }
    console.log("tamoghna2");
    console.log("req.user._id===>", req.user._id);
    
    const createCompany = await Company.create({
        name: companyName,
        userId: req.user._id,
    })
    console.log("tamoghna3");
    if(!createCompany){
        throw new ApiError(500, "Something went wrong while creating company")
    }
    return res.status(200).json(new ApiResponse(200, createCompany,"Company created successfully"))
})

/*Get the list of the companies for loggedIn user*/

const getCompanies = asyncHandler(async (req, res) => { 
    // Check the user is loggedIn or not
    // if user is not loggedIn throw the error
    if (!req.user) {
        throw new ApiError(401, "User is not loggedIn")
    }
    // if user loggedIn get the list of companies
    const companyArray = await Company.find({ userId: req.user._id })
    // if there is no companies throw error
    if (!companyArray) {
        throw new ApiError(404, "No companies found")
    }
    // if there is companies return the list of companies
    return res.status(200).json(new ApiResponse(200, companyArray, "Companies found"))
    
})

/*Get the company by ID  */

const getCompanyByID = asyncHandler(async (req, res) => { 
    if (!req.user) {
        throw new ApiError(401, "User is not loggedIn")
    }

    const companyId = req.params.id;
    console.log("companyId===>", companyId);
    
    const company = await Company.findById( companyId )
    console.log("company===>", company);
    
    if (!company) {
        throw new ApiError(404, "Company not found")
    }
    return res.status(200).json(new ApiResponse(200, company, "Company found"))
})

/* Update the company data */

const updateCompanyData = asyncHandler(async (req, res) => {
    const { name, description, website, location, logo } = req.body;
    const file = req.file;

    // throw error if any one of this is not present
    if (!name || !description || !website || !location || !logo) {
        throw new ApiError(500, "All the fields are required")
    }
    // check the user is loggedIn or not
    if (!req.user) {
        throw new ApiError(401, "User is not loggedIn")
    }
    // check the company is present or not  
    const company = await Company.findOne({ _id: req.params.id })
    if (!company) {
        throw new ApiError(404, "Company not found")
    }
    // update the company data
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, {
        name,
        description,
        website,
        location,
        logo
    }, { new: true })
    if (!updatedCompany) {
        throw new ApiError(500, "Something went wrong while updating company")
    }
    return res.status(200).json(new ApiResponse(200, updatedCompany, "Company updated successfully"))
 })

export {
    registerCompany,
    getCompanies,
    getCompanyByID,
    updateCompanyData
 }