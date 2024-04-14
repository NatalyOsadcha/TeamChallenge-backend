import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/usersSchemas.js";
import { registerUser } from "../controllers/usersControllers.js"


const usersRouter = express.Router();


usersRouter.post("/register", validateBody(registerUserSchema), registerUser);


export default usersRouter;