import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"

const verifyToken = asyncHandler(async (req, res, next) => {
    try {
       
        
        const token = req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401,"Unauthorized Request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("Tamoghna");
        console.log("decodedToken===>", decodedToken);
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log("User===>", user);
        
        if (!user) {
            return new ApiError(401, "Invalid AccessToken")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message||"Invalid Access Token")
    }
})
export {verifyToken}