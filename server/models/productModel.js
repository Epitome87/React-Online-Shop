import mongoose from 'mongoose';
import { reviewModel } from './reviewModel.js';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Misc',
    },
    averageRating: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewModel],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
