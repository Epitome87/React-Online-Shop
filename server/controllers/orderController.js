import Order from '../models/orderModel.js';

// Get all orders of every User
// Admin / Auth-protected
export const getOrders = async (req, res) => {
  try {
    // Get all Orders, along with name and id of associated User
    const orders = await Order.find({}).populate('user', 'id name');

    return res.status(200).send(orders);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Get an Order of currently logged-in User by its ID
// Admin / Auth-protected
export const getOrder = async (req, res) => {
  try {
    // Get order with matching ID, along with name and id of associated User
    const order = await Order.findById(req.params.id).populate('user', 'id name email');

    if (order.user._id.toString() !== req.user._id.toString()) {
      res.status(400);
      throw new Error('Not authorized to view this order');
    }

    return res.status(200).send(order);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Get the Orders of currently logged-in User
// Auth-protected
export const getOwnOrders = async (req, res) => {
  try {
    // Get all Orders by using with ID of current auth'd User
    const orders = await Order.find({ user: req.user._id });

    return res.status(200).send(orders);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Create new Order for currently logged-in User
export const createOrder = async (req, res) => {
  const { user, items, shippingAddress, totalPrice } = req.body;

  try {
    // Make sure there's even any Items in the order -- otherwise there's nothing further to do
    if (items && items.length === 0) {
      res.status(400);
      throw new Error('No items in this order');
    } else {
      const order = await Order.create({
        // User is the one currently logged-in
        user: req.user._id,
        items,
        shippingAddress,
        totalPrice,
      });

      res.status(201).send(order);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
