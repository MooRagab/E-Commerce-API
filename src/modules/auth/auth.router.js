import { Router } from "express";
import * as registerController from "./controller/registration.js";

const router = Router();

//SignUp & Confirm E-mail
router.post("/signup", registerController.signUp);
router.get("/confirmemail/:token", registerController.confirmEmail);

//SignIn
router.post("/signin", registerController.signIn);

export default router;
