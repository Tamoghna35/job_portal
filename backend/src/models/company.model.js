import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String // URL to company logo
    },
    JobUserId: {
        type: Schema.Types.ObjectId,
        ref: 'JobUser',
        required: true
    }
}, { timestamps: true })
export const Company = mongoose.model("Company", companySchema);