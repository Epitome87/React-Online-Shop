import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (value.includes('password')) {
          throw new Error('Password cannot contain the phrase "password"');
        }
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// This func is available on an instance of a Model
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '30d' });

  // user.tokens = user.tokens.concat({ token });
  user.token = token;
  await user.save();

  return token;
};

// This static function is available on the Model itself
userSchema.statics.findByCredentials = async (email, password) => {
  // Find the User with matching credentials from database
  const user = await User.findOne({ email });

  //   No User with this email found -- note we give vague error message intentionally
  if (!user) {
    throw new Error('Invalid email or password provided');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  // Password incorrect -- again, vague errors for security reasons!
  if (!isMatch) {
    throw new Error('Invalid email or password provided');
  }

  // Everything went smoothly -- respond with the User object
  return user;
};

// Hash the plain-text password pre-save
// Note we don't use arrow function since it won't bind 'this' to our User
userSchema.pre('save', async function (next) {
  const modifiedUser = this;

  // If password wasn't modified, no need to hash it (in fact we'd be hashing a hash, most likely!)
  if (modifiedUser.isModified('password')) {
    const numberOfSaltRounds = 8;
    modifiedUser.password = await bcrypt.hash(modifiedUser.password, numberOfSaltRounds);
  }

  // This is treated as middleware -- move onto the next one!
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
