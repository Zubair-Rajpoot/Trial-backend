import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 7,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema)