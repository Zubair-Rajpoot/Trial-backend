import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import { db_connect } from "./utils/db.js"
import authRoutes from "./routes/auth.routes.js"
import profileRoutes from "./routes/profile.routes.js"
import productRoutes from "./routes/product.routes.js"

const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
    res.send("hello")
})

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    db_connect()
})