import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    // User this Order belongs to
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // List of items that make up this Order
    items: {
      type: [
        {
          // Reference to the Product itself
          product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
          // It may seem redundant to store name, image, price if they can be found within the product field above...
          // ...but the Product can always change over time! Especially the price.
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
    isPaid: {
      type: Boolean,
      default: false,
    },
    isShipped: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
