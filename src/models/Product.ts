import mongoose, { Schema, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  rating: { type: Number, default: 0 },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  description: { type: String },
}, { timestamps: true });

export default models.Product || mongoose.model('Product', ProductSchema);
