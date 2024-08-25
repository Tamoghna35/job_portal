import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullName: {
        type: "String",
        required:true
    },
    email: {
        type: "String",
        required: true,
        unique:true
    },
    phoneNumber: {
        type: "Number",
        required: true,
        unique:true
    },
    password: {
        type: "String",
        required: true
    },
    role: {
        type: "String",
        enum: ["Student", "Recruiter"],
        required: true,
    },
    profile: {
        bio: { type: "String" },
        skills: [{ type: "String" }],
        resume: { type: "String" },
        resumeOriginalName: { type: "String" },
        company: {
            type: Schema.Types.ObjectId,
            ref: "Company"
        },
        profilePhoto: {
            type: "String",
            default:""
        }
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();
})

// cmopare the encypted password and actual password

userSchema.methods.isPasswordCorrect = async function (password) {
    console.log("Password in isPasswordCorrect ==>", password);
    console.log('Hashed Password:', this.password); 

    return await bcrypt.compare(password, this.password)
}


// Generate access token

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        fullName: this.fullName,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// generating refreshToken

userSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKRN_EXPIRY
        }
    )
}



export const User = mongoose.model("JobUser", userSchema)