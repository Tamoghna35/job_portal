import dotenv from "dotenv";
import connectMongoDB from "./db/index.js"
import { app } from "./app.js";

dotenv.config({ path: "./env" })


connectMongoDB()
    .then(() => {
        app.on("Error", (error) => {
            console.log("ERR", error);
            throw error;
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server listin at port : ${process.env.PORT}`);
            
        })
    })
    .catch((error) => {
        console.log(`Mongodeb connection Failed`, error);
        
    })