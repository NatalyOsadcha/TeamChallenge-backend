import express from "express";
import { createBaseProduct } from "../controllers/productsControllers.js";

import validateBody from "../helpers/validateBody.js" 
import { baseProductSchema } from "../schemas/productsSchemas.js";
import { authanticate } from "../middlewares/authanticate.js";

const baseProductsRouter = express.Router();

baseProductsRouter.post("/", [authanticate, validateBody(baseProductSchema), createBaseProduct]);

export default baseProductsRouter;