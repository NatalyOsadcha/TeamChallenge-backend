import * as productsServices from "../services/productsServices.js"
import ctrlWrapper from "../helpers/ctrlWrapper.js";
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
      await productsServices.deleteProduct(product._id, customer._id);
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to clear shopping cart" });
  }

  res.status(201).json(newOrder);
});

export const getAllOrders = ctrlWrapper(async (req, res) => {
  const currentUser = req.user;

  try {
    const userOrders = await ordersServices.getUserOrders(currentUser._id);

    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});