import { Router } from "express";
import * as registerController from "./controller/registration.js";

const router = Router();

router.post("/signup", registerController.signUp);
router.post("/signin", registerController.signIn);
router.get("/confirmemail/:token", registerController.confirmEmail);

export default router;
