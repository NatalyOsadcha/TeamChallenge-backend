import * as productsCartServices from "../services/productsCartServices.js"
import * as productsBaseServises from "../services/productsBaseServises.js"
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { updateProductSchema } from "../schemas/productsSchemas.js";
import { handleNotFound } from "../helpers/errorHandlers.js";


export const getAllProducts = ctrlWrapper(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const currentUser = req.user;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10)
  };

  const products = await productsCartServices.getAllProducts(currentUser._id, options).populate("owner", "email");
    
  res.json(products);
});

export const getOneProduct = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const oneProduct = await productsCartServices.getOneProduct(id, owner);
  if (!oneProduct) {
    return handleNotFound(req, res);
  }
  res.json(oneProduct);
});

export const deleteProduct = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const deletedProduct = await productsCartServices.deleteProduct(id, owner);
  if (!deletedProduct) {
    return handleNotFound(req, res);
  }
  res.json(deletedProduct);
});

export const createProduct = ctrlWrapper(async (req, res) => {
  const { name, category, price, quantity, description, imageUrl, favorite } = req.body;
  const owner = req.user._id;

  try {
    const existingProduct = await productsCartServices.getProductByOwnerAndName(owner, name, category);

    if (existingProduct) {
      const updatedQuantity = existingProduct.quantity + quantity;
      const updatedProduct = await productsCartServices.updateProductQuantity(existingProduct._id, updatedQuantity);
      
      res.status(200).json(updatedProduct);
    } else {
      const result = await productsCartServices.createProduct({ name, category, price, quantity, description, imageUrl, favorite, owner });
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const createBaseProduct = ctrlWrapper(async (req, res) => {
  const { name, category, price, quantity, description, imageUrl, favorite } = req.body;
  const owner = req.user._id;

  try {
    const existingProduct = await productsBaseServises.getBaseProductByOwnerAndName(owner, name, category);

    if (existingProduct) {
      const updatedQuantity = existingProduct.quantity + quantity;
      const updatedProduct = await productsBaseServises.updateBaseProductQuantity(existingProduct._id, updatedQuantity);
      res.status(200).json(updatedProduct);
    } else {
      const result = await productsBaseServises.createBaseProduct({ name, category, price, quantity, description, imageUrl, favorite, owner });
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const updateProduct = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { _id: owner } = req.user;
  const options = { new: true };

  const existingProduct = await productsCartServices.updateProduct(id, body, owner);
  if (!existingProduct) {
    return handleNotFound(req, res);
  }

  try {
    await updateProductSchema.validateAsync(body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (!Object.keys(body).length) {
    return res.status(400).json({ message: "Body must have at least one field" });
  }

  const updatedProduct = await productsCartServices.updateProduct(id, body, owner, options);

  res.status(200).json(updatedProduct);
});

// export const updateProductQuantity = async (productId, newQuantity) => {
//   const product = await Product.findByIdAndUpdate(productId, { quantity: newQuantity }, { new: true });
//   const updatedPrice = product.price * newQuantity;
//   return { product, updatedPrice };
// };

export const updateStatusProduct = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;
  const options = { new: true };

  const updatedFavorite = await productsCartServices.updateStatusProduct(
    id,
    { favorite },
    owner,
    options
  );

  if (!updatedFavorite) {
    return handleNotFound(req, res);
  }

  res.status(200).json(updatedFavorite);
});