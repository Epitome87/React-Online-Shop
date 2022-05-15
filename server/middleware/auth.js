import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const auth = async (req, res, next) => {
  try {
    // Get the value of the token from the Authorization Header
    const token = req.header('Authorization');
    // We can also find the value at: req.headers.authorization

    if (!token) {
      res.status(401);
      throw new Error('Not authorized -- no token');
    }

    const parsedToken = token.replace('Bearer ', '');
    const decoded = jwt.verify(parsedToken, process.env.JWT_SECRET);

    // Remember, our Token's payload stores our User ID
    // Is this Token one belonging to our User?
    // TODO: I've seen this NOT require the token to be found -- which method do I take?
    const user = await User.findOne({ _id: decoded._id, token: parsedToken }).select('-password');

    if (!user) {
      console.log('Unable to auth user with id and token of', decoded._id, token);
      // Throw error to trigger catch
      throw new Error();
    }

    // We've reached here -- everything went smooth!
    console.log(`Authenticated User ${decoded._id} with token ${token}`);

    // Attach user and token to the request
    req.user = user;
    req.token = token;

    // This is a middleware; move on!
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};
