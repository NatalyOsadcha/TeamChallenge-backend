import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

const Order = mongoose.model('Order', orderSchema);

export default Order;