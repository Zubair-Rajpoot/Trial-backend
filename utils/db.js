import mongoose from "mongoose";

export const db_connect = async ()=>{
    try {
       const con = await mongoose.connect(process.env.DB_URL)
       if(con){
        console.log("MongoDB Connected..")
       }
    } catch (error) {
        console.log("Error: "+ error.message)        
    }
}