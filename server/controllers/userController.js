import User from '../models/userModel.js';
import users from '../users.js';

// Authenticate User, retrieve Token
export const authenticateUser = async (req, res) => {
  const { email, name, password } = req.body;
  // TODO: Use JSON Web Tokens
  const token = 'okay!';

  try {
    const user = await User.findByCredentials(email, password);
    return res.status(200).send({ user, token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const getUser = async (req, res) => {
  res.json(users);
};
