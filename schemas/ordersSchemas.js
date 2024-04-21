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

