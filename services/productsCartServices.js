import Product from "../models/productCartModel.js";

export const getAllProducts = (owner, options) => Product.find({ owner }).skip((options.page - 1) * options.limit).limit(options.limit);

export const getOneProduct = (id, owner) => Product.findOne({ _id: id, owner });

export const deleteProduct = (id, owner) => Product.findOneAndDelete({ _id: id, owner });

export const createProduct = (productData) => Product.create(productData);

export const getProductByOwnerAndName = (owner, name) => Product.findOne({ owner, name });

export const updateProductQuantity = (productId, newQuantity) => Product.findByIdAndUpdate(productId, { quantity: newQuantity }, { new: true });

export const updateProduct = (id, body, owner, options) => Product.findOneAndUpdate({ _id: id, owner }, body, options);

export const updateStatusProduct = (id, body, owner, options) => Product.findOneAndUpdate({ _id: id, owner: owner }, body, options);