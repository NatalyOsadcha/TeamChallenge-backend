import Joi from 'joi';

export const createOrderSchema = Joi.object({
  products: Joi.array()
    .items(Joi.object({
      _id: Joi.string().required(),
      quantity: Joi.number().required()
    }))
    .required(),
  totalPrice: Joi.number().required(),
  shippingAddress: Joi.string().required(),
});

export const updateOrderSchema = Joi.object({
  status: Joi.string().valid('pending', 'processing', 'shipped', 'completed', 'cancelled').optional()
});