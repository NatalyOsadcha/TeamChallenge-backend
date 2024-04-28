import express from "express";
import {
  getUserOrders,
  getOneOrder,
  // deleteOrder,
  createOrder,
  updateOrderStatus,
} from "../controllers/ordersControllers.js";

import validateBody from "../helpers/validateBody.js";
import { createOrderSchema, updateOrderSchema } from "../schemas/ordersSchemas.js";
import { validateId } from "../middlewares/idValidator.js";
import { authanticate } from "../middlewares/authanticate.js";

const ordersRouter = express.Router();

ordersRouter.get("/", authanticate, getUserOrders);

ordersRouter.get("/:id", authanticate, validateId, getOneOrder);

// ordersRouter.delete("/:id", authanticate, validateId, deleteOrder);

ordersRouter.post("/", [authanticate, validateBody(createOrderSchema), createOrder]);

ordersRouter.put("/:id", [authanticate, validateId, validateBody(updateOrderSchema), updateOrderStatus]);

export default ordersRouter;
