import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

export const baseProductSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  category: Joi.string().optional(),
  price: Joi.number().optional(),
  quantity: Joi.number().optional(),
  description: Joi.string().optional(),
  imageUrl: Joi.string().optional(),
  favorite: Joi.boolean().optional(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});