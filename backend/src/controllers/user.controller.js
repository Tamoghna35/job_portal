import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"



// logic to generate AccessToken and Refresh Token
const generateAccessandRefreshToken = async (userId) => {
    try {
        console.log("userId", userId);
        
        const user = await User.findById(userId);
        console.log("User ===>", user);
        
        const accessToken = user.generateAccessToken();
        console.log("Access Token==>", accessToken);
        
        const refreshToken = user.generateRefreshToken();
        console.log("Refresh Token==>", refreshToken);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Access Token and refresh Token")
    }
    
}
//  userRegistration

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, password, role } = req.body
    // This is for all requid field validation
    if ([fullName, email, phoneNumber, password, role].some((field) => field?.trim === "")) {
        throw new ApiError(500, "All the fields are required")
    }
    // Checking for already existinf user
    const existedUser = await User.findOne({
        $or:[{fullName}, {email},{phoneNumber}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with same email or phoneNumber is already exist")
    }
    // Afterchecking all requiredFiels and the existed user we are create the new User

    const createUser = await User.create({
        fullName: fullName.toLowerCase(),
        email,
        phoneNumber,
        role,
        password

    })

    if (!createUser) {
        throw new ApiError(500, "Something went wrong while creating the user")
    }
    return res.status(200).json(
        new ApiResponse(200, "User created Successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    // taake the required Fields from user
    const { email, password, role } = req.body;
    // check any fields are empty or not
    if (!email && !password & !role) {
        throw new ApiError(400, "Email or Password or role is required")
    }
    console.log("Password=>", password);
    
    // if required foelds fetched correctly then check user with the same creeentials present in DB or not
    const existingUser = await User.findOne({ $or: [{ email }, { password }, { role }] })
    console.log("Existing User ==>", existingUser);
    
    // if not throw error, if present then check the entered password with the pasword saved in DB
    if (!existingUser) {
        throw new ApiError(400, "user is not registered with same email or password or role.")
    }
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password)

    // if not matched throw error
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is not valid")
    }
    // if matched generate the accessToken and refreshToken fro that user
    const {accessToken,refreshToken } =await generateAccessandRefreshToken(existingUser._id)
    // store the user credentials in a variable exclude password and refreshToken
    const loggedInUser = await User.findById(existingUser._id).select("-password -refreshToken")
    // sent cookies
    const options = {
        httpOnly: true,
        secure: true,
    }
    // return the response to user
    return res
        .status(200)
        .cookie("AccessToken", accessToken,options)
        .cookie("RefreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User loggedIn successfully"
        )
    )


})

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id
        , {
            $set: {
                refreshToken: undefined
            }
        }, {
        new: true
    })
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"))
})


const updateUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "User is not logged In")
    }
    const { fullName, email, phoneNumber, bio, skills } = req.body
    if (!fullName || !email || !phoneNumber || !bio || !skills) {
        throw new ApiError(400, "Required Fields are missing")
    }
    const skillsArray = skills.split(",")
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email,
                phoneNumber,
                'profile.bio': bio,
                'profile.skills': skillsArray
            }
        },
        {new: true}
    ).select("-password")
    // Check if user update was successful
    if (!user) {
        throw new ApiError(500, "Something went wrong while updating user data");
    }
    return res.status(200)
    .json(new ApiResponse(200, user, "User data update Successfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    updateUser
}