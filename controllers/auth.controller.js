import User from "../models/auth.model.js"
import bcrypt from 'bcryptjs'
import _ from "lodash"
import { generateTokenAndSetCookie } from "../utils/token.js"

export const signup = async (req, res) => {
    const { fullName, username, password, confirm, gender } = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        if (hashed) {
            const user = await User.create({
                fullName,
                username,
                password: hashed,
                gender
            })
            // generateTokenAndSetCookie(_.pick(user, ["_id", "fullName", "username", "gender"]), res)
            await user.save()
            res.status(201).json({
                message: "User created successfully",
                user: _.pick(user, ["_id", "fullName", "gender"])
            })
        }

    } catch (error) {
        console.log("Error in auth controller:" + error.message)
        res.status(500).json("Internal Server Error - Check Console")
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: "username or password is incorrect" })
        }
        const matched = await bcrypt.compare(password, user.password)
        if (!matched) {
            return res.status(400).json({ message: "username or password is incorrect" })
        }
        generateTokenAndSetCookie(_.pick(user, ["_id", "username", "fullName", "gender"]), res)
        res.status(200).json({ message: "Login Successfull" })
    } catch (error) {
        console.log("Error in login: " + error.message)
        res.status(500).json({ error: "Internal Server Error - check console" })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({ message: "Logout Successfuly" })
    } catch (error) {
        console.log("Error in logout: " + error.message)
        res.status(500).json({ error: "Internal Server Error - check console" })
    }
}