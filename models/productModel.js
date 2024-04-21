import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
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

const Product = mongoose.model('Product', productSchema);


export default Product;