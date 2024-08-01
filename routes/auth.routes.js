import express from "express"
import { signup, login, logout } from "../controllers/auth.controller.js"
import { checkUserExistance } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("auth route is working")
})

router.post("/signup", checkUserExistance, signup)
router.post("/login", login)
router.post("/logout", logout)

export default router