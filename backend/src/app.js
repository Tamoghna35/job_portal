import express from "express"
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())


import JobUserRouter from "./routes/user.route.js"
app.use("/api/v1/JobUser", JobUserRouter)

import CompanyRouter from "./routes/company.router.js"
app.use("/api/v1/company", CompanyRouter)

import JobRouter from "./routes/job.router.js"
app.use("/api/v1/job", JobRouter)

import ApplicationRouter from "./routes/application.router.js"
app.use("/api/v1/application", ApplicationRouter)




export { app }
