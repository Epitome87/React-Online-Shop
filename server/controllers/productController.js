import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).send(allProducts);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getProduct = async (req, res) => {
  const { id: productID } = req.params;

  try {
    const product = await Product.findById(productID);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    return res.send(product);
  } catch (error) {
    res.status(500).send();
  }
};

export const updateProduct = async (req, res) => {
  const propertiesToUpdate = Object.keys(req.body);
  const allowedUpdates = ['name', 'price', 'description', 'image', 'category', 'numberInStock'];
  const isValidOperation = propertiesToUpdate.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Product updates ' });
  }

  try {
    const product = await Product.findById(req.params.id);

    for (const update of propertiesToUpdate) {
      product[update] = req.body[update];
    }

    await product.save();

    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    // The product we are reviewing is part of the URL
    const product = await Product.findById(req.params.id);

    if (product) {
      // User has already submitted Review?
      const userAlreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());
      if (userAlreadyReviewed) {
        res.status(400);
        throw new Error('Already reviewed this product');
      }

      const newReview = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(newReview);

      // TODO: Build this into the Product Model itself
      product.numberOfRatings = product.reviews.length;

      product.averageRating =
        product.reviews.reduce((acc, curr) => {
          return acc + curr.rating;
        }, 0) / product.reviews.length;

      await product.save();

      res.status(201).json({ message: 'Review successfully added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.send(error.message);
  }
};
