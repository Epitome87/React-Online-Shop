import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import users from '../users.js';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

// Helper object instance method for comparing passwords
// TODO: This isn't working -- probably can't use from within this file?
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
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

const User = mongoose.model('User', userSchema);

export default User;
