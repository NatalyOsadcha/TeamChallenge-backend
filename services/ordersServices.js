  import Order from "../models/orderModel.js";

  export const createOrder = orderData => Order.create(orderData);

  export const getUserOrders = ownerId => Order.find({ customer: ownerId });

  export const getOneOrder = orderId => Order.findById(orderId);

export const updateOrderStatus = (orderId, status) => Order.findByIdAndUpdate(orderId, { status }, { new: true });

// export const deleteOrder = orderId => Order.findByIdAndDelete(orderId);