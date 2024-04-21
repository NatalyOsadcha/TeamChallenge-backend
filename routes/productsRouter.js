import express from "express";
import {
  getAllProducts,
  getOneProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  updateStatusProduct,
} from "../controllers/productsControllers.js";

import validateBody from "../helpers/validateBody.js" 
import { createProductSchema, updateProductSchema, updateFavoriteSchema } from "../schemas/productsSchemas.js";
import { validateId } from "../middlewares/idValidator.js";
import { authanticate } from "../middlewares/authanticate.js";

const productsRouter = express.Router();

productsRouter.get("/", authanticate, getAllProducts);

productsRouter.get("/:id", authanticate, validateId, getOneProduct);

productsRouter.delete("/:id", authanticate, validateId, deleteProduct);

productsRouter.post("/", [authanticate, validateBody(createProductSchema), createProduct]);

productsRouter.put("/:id", [authanticate, validateId, validateBody(updateProductSchema), updateProduct]);

productsRouter.patch("/:id/favorite", [authanticate, validateId, validateBody(updateFavoriteSchema)], updateStatusProduct);

export default productsRouter;