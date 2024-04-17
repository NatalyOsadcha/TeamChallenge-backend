import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, emailSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import { registerUser, loginUser, getCurrentUser, verifyEmail, resendVerifyEmail } from "../controllers/usersControllers.js";
import { authanticate } from "../middlewars/authanticate.js";


const usersRouter = express.Router();


usersRouter.post("/register", validateBody(registerUserSchema), registerUser);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

usersRouter.get("/current", authanticate, getCurrentUser);


export default usersRouter;