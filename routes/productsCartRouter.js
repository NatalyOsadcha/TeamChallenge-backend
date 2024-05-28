import express from "express";
import {
  getAllProducts,
  getOneProduct,
  deleteProduct,
  createProduct,
  createBaseProduct,
  updateProduct,
  updateStatusProduct,
} from "../controllers/productsControllers.js";

import validateBody from "../helpers/validateBody.js" 
import { createProductSchema, baseProductSchema, updateProductSchema, updateFavoriteSchema } from "../schemas/productsSchemas.js";
import { validateId } from "../middlewares/idValidator.js";
import { authanticate } from "../middlewares/authanticate.js";

const cartProductsRouter = express.Router();

cartProductsRouter.get("/", authanticate, getAllProducts);

cartProductsRouter.get("/", [authanticate], getAllProducts);

cartProductsRouter.get("/:id", authanticate, validateId, getOneProduct);

cartProductsRouter.delete("/:id", authanticate, validateId, deleteProduct);

cartProductsRouter.post("/", [authanticate, validateBody(createProductSchema), createProduct]);

cartProductsRouter.post("/", [authanticate, validateBody(baseProductSchema), createBaseProduct]);

cartProductsRouter.put("/:id", [authanticate, validateId, validateBody(updateProductSchema), updateProduct]);

cartProductsRouter.patch("/:id/favorite", [authanticate, validateId, validateBody(updateFavoriteSchema)], updateStatusProduct);

export default cartProductsRouter;