import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"

const connectMongoDB = async () => {
    try {
        const conectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n mongodb connect at : ${conectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB cCOnnection Failed", error);
        process.emit(1);
    }
    
}

export default connectMongoDB