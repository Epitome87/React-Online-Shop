import mongoose from 'mongoose';

// Export the review schema, since Product references it
export const reviewModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      minLength: 10,
    },
    // User this Rating belongs to
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewModel);

export default Review;
