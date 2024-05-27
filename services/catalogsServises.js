import BaseProduct from "../models/catalogModel.js";

export const createBaseProduct = (catalogData) => BaseProduct.create(catalogData);

export const getBaseProductByOwnerAndName = (owner, name) => BaseProduct.findOne({ owner, name });

export const updateBaseProductQuantity = (productId, newQuantity) => BaseProduct.findByIdAndUpdate(productId, { quantity: newQuantity }, { new: true });
