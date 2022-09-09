import { Router } from "express";
import AuthController from "../controllers/auth.controller";
const router = Router()

const authCtrl = new AuthController()

router.post("/login", authCtrl.logIn)
router.post("/signup", authCtrl.signUp)


export default router