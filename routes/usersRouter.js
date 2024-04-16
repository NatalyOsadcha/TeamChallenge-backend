import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, emailSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import { registerUser, loginUser, verifyEmail, resendVerifyEmail } from "../controllers/usersControllers.js"


const usersRouter = express.Router();


usersRouter.post("/register", validateBody(registerUserSchema), registerUser);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);


export default usersRouter;