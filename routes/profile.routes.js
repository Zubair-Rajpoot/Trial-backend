import express from "express"
import { update, updatePassword, getProfile } from "../controllers/profile.controller.js"
import { userAuthentication } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/", userAuthentication, getProfile)
router.put("/update", userAuthentication, update)
router.patch("/update/pwd", userAuthentication, updatePassword)


export default router