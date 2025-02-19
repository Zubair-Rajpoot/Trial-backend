import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sizes: [{
        size: {
            type: String,
            required: true
        },
        colors: [{
            color: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }]
    }]
}, { timestamps: true })

export default mongoose.model("Product", productSchema)