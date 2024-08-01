import Jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (user, res) => {
    try {
        const token = Jwt.sign(user, process.env.SECRET, { expiresIn: "2d" })
        if (token) {
            const oneDay = 24 * 60 * 60 * 1000
            const expires = new Date(Date.now() + oneDay)
            res.cookie("jwt", token, { expires, httpOnly: true })
        }
    } catch (error) {
        console.log("Error in generateToken - " + error.message)
        res.status(500).json({ error: "Internal server error - check console" })
    }

}