import { Router } from "express";
import * as registerController from "./controller/registration.js";
import * as validator from "./auth.validation.js";
import { validation } from "../../middleware/valdiation.js";
const router = Router();

//SignUp & Confirm E-mail
router.post("/signup", validation(validator.signUp), registerController.signUp);
router.get("/confirmemail/:token", registerController.confirmEmail);

//SignIn
router.post("/signin", validation(validator.signIn), registerController.signIn);

export default router;
