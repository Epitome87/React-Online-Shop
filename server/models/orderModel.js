import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    // User this Order belongs to
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // List of  products that make up this Order
    items: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postal: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
