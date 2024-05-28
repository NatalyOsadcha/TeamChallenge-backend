import mongoose from "mongoose";

const { Schema } = mongoose;

const baseProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for product'],
  },
  category: String,
  price: {
    type: Number,
    required: [true, 'Set price for product'],
  },
  quantity: {
    type: Number,
    required: [true, 'Set quantity for product'],
  },
  description: {
    type: String,
    required: [true, 'Set description for product'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Set imageUrl for product'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { versionKey: false });

const BaseProduct = mongoose.model('BaseProduct', baseProductSchema);


export default BaseProduct;