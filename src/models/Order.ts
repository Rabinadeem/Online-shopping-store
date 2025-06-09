import mongoose, { Schema, models } from 'mongoose';

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      size: String,
      color: String,
      quantity: Number,
      price: Number,
    }
  ],
  total: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['COD', 'Card'], default: 'COD' },
}, { timestamps: true });

export default models.Order || mongoose.model('Order', OrderSchema);
