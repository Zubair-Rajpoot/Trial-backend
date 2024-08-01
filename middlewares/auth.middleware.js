import User from "../models/auth.model.js"
import Joi from "joi"
import Jwt from "jsonwebtoken"

const schema = Joi.object({
    fullName: Joi.string().trim().min(3).max(30).required(),
    username: Joi.string().alphanum().trim().min(4).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    confirm: Joi.ref('password'),
    gender: Joi.string().valid("male", "female")
})

export const checkUserExistance = async (req, res, next) => {
    const { fullName, username, password, confirm, gender } = req.body
    const { error, value } = schema.validate({
        fullName,
        username,
        password,
        confirm,
        gender
    })
    if (error) {
        return res.status(400).json({ error: error.message })
    }
    try {
        const user = await User.findOne({ username: value.username })
        if (user) {
            return res.status(400).json({ error: "User already exist" })
        }
        next()
    } catch (error) {
        console.log("error in checkUserExistance Middleware - " + error.message)
        res.status(500).json({ error: "Internal Server Error - Check Console" })
    }
}

export const userAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Token is required" })
        }
        const decoded = Jwt.verify(token, process.env.SECRET)
        if (!decoded) {
            return res.status(401).json({ message: "UnAuthorized - Invalid Token" })
        }
        req.user = decoded
        next()
    } catch (error) {
        console.log("Error in Authentication: " + error.message)
        res.status(500).json({ error: "Internal Server Error in user Authentication" })
    }
}