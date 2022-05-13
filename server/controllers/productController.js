import Product from '../models/productModel.js';

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).send(allProducts);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getProduct = async (req, res) => {
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

export { getProducts, getProduct };
