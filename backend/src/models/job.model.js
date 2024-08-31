import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'JobUser',
        required: true
    },
    applications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
}, { timestamps: true });
export const Job = mongoose.model("Job", jobSchema);


