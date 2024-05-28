import * as productsCartServices from "../services/productsCartServices.js"
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { handleNotFound } from "../helpers/errorHandlers.js";
import { createOrderSchema } from "../schemas/ordersSchemas.js";
import * as ordersServices from "../services/ordersServices.js";

export const createOrder = ctrlWrapper(async (req, res) => {
  const { products, totalPrice, shippingAddress } = req.body;
  const customer = req.user;
  
  try {
    await createOrderSchema.validateAsync({ products, totalPrice, shippingAddress });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const orderData = { products, totalPrice, shippingAddress, customer };
  const newOrder = await ordersServices.createOrder(orderData);

  try {
    for (const product of products) {
      await productsCartServices.deleteProduct(product._id, customer._id);
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to clear shopping cart" });
  }

  res.status(201).json(newOrder);
});

export const getUserOrders = ctrlWrapper(async (req, res) => {
  const currentUser = req.user;
  const userOrders = await ordersServices.getUserOrders(currentUser._id);
  res.json(userOrders);
});

export const getOneOrder = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const order = await ordersServices.getOneOrder(id);
    
  if (!order) {
    return handleNotFound(req, res);
  }

  res.json(order);
});

export const updateOrderStatus = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedOrder = await ordersServices.updateOrderStatus(id, status);
  
  if (!updatedOrder) {
    return handleNotFound(req, res);
  }

  res.status(200).json(updatedOrder);
});