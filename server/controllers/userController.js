import User from '../models/userModel.js';

// Authenticate User (log in), retrieve Token
export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);

    // Generate Auth Token for this user
    const token = await user.generateAuthToken();

    return res.status(200).send({ user, token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

// Authenticate User, retrieve Token
export const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const userAlreadyRegistered = await User.findOne({ email });

    // This User exists already -- can't re-register!
    if (userAlreadyRegistered) {
      res.status(400);
      throw new Error('User already registered');
    }

    // Despite its name, .create will also allow our pre 'save' User middleware to run
    // Our password will be hashed in that middleware -- no need to do it here!
    const user = await User.create({
      email,
      name,
      password,
    });

    // Everything went smooth creating the User...
    if (user) {
      // Generate Auth Token for this User
      const token = await user.generateAuthToken();

      res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token,
      });
    } else {
      throw new Error('Error attempting to register');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    res.status(404).send('User not found');
  }

  res.send(user);
};

export const updateUserProfile = async (req, res) => {
  const propertiesToUpdate = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = propertiesToUpdate.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid User updates ' });
  }

  try {
    for (const update of propertiesToUpdate) {
      req.user[update] = req.body[update];
    }

    // Remember: Password is encrypted pre-save by our User Schema!
    await req.user.save();

    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// GET /api/users
// Auth / Admin required
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// GET /api/users/:id
// Auth / Admin required
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.send(user);
    } else {
      res.status(404);
      throw new Error('Failed to retrieve User');
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// PUT /api/users/:id
// Auth / Admin required
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      const propertiesToUpdate = Object.keys(req.body);
      const allowedUpdates = ['name', 'email', 'isAdmin'];
      const isValidOperation = propertiesToUpdate.every((update) => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid User updates ' });
      }

      for (const update of propertiesToUpdate) {
        user[update] = req.body[update];
      }

      // Remember: Password is encrypted pre-save by our User Schema!
      await user.save();

      // We don't want to return all User data back...
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('Failed to retrieve User');
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// DELETE /api/users/:id
// Auth / Admin required
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.send({ message: 'User successfully removed' });
    } else {
      res.status(400);
      throw new Error(`User with that ID not found`);
    }
  } catch (error) {
    res.send(error.message);
  }
};
