import users from './users.js';
import products from './products.js';
import orders from './orders.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import 'dotenv/config';
import connectDatabase from './mongooseConfiguration.js';

connectDatabase();

const seedData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    // First user in our placeholder list has isAdmin of true
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// if (process.argv[2] === '-d') {
//   deleteData();
// } else {
//   seedData();
// }

const seedOrders = async () => {
  try {
    await Order.insertMany(orders);

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedOrders();
