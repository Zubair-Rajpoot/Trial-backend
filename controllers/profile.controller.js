import Joi from "joi"
import User from "../models/auth.model.js"
import Jwt from "jsonwebtoken"
import _ from "lodash"
import bcrypt from "bcryptjs"
import { makeHash } from "../utils/hash.js"

export const update = async (req, res) => {
    try {

        const user = req.user
        const { fullName, gender } = req.body
        const updatedUser = await User.updateOne({ _id: user._id }, {
            fullName,
            gender
        })
        if (updatedUser.matchedCount === 1) {
            res.status(200).json({ message: "Record updated successfully" })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error in update" })
    }
}
export const getProfile = (req, res) => {
    try {

        const user = req.user
        if (user) {
            res.status(200).json({ user: _.pick(user, ["_id", "username", "fullName", "gender"]) })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error in getting profile" })
    }
}

const passwordSchema = Joi.object({
    currentPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.ref("newPassword")
})

export const updatePassword = async (req, res) => {
    const currentUser = req.user
    const { currentPassword, newPassword, confirmPassword } = req.body
    try {

        const { error, value } = passwordSchema.validate({
            currentPassword,
            newPassword,
            confirmPassword
        })
        if (error) {
            return res.status(400).json({ message: error.message })
        }
        const user = await User.findById(currentUser._id)
        const matched = await bcrypt.compare(value.currentPassword, user.password)
        if (!matched) {
            return res.status(403).json({ message: "Incorrect Password" })
        }
        const hashed = await makeHash(value.newPassword)
        user.password = hashed
        await user.save()
        res.status(200).json({ message: "Password updated successfully" })

    } catch (error) {
        console.log("Error in update password" + error.message)
        res.status(500).json({ error: "Internal Server Error in updating password" })
    }
}