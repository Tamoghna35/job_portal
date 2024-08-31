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


PORT= 6000
CORS_ORIGIN = *
MONGODB_URI = mongodb+srv://tamoghna9876:tamoghna9876@cluster0.neoe8t8.mongodb.net/
ACCESS_TOKEN_SECRET= qwertyuioppppppppppppppppplkjhgfds
ACCESS_TOKEN_EXPIRY = 1d

REFRESH_TOKEN_SECRET= qwertyuioppiuttppppppppppppppplkjhgfds
REFRESH_TOKEN_EXPIRY= 10d