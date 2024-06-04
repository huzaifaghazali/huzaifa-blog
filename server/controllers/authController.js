import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const nweUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await nweUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, 'Invalid credentials'));
    }

    // Generate a JSON Web Token (JWT) using the user's ID and admin status
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    // Remove the password property from the user object and store the rest in a variable called rest
    const { password: pass, ...rest } = validUser._doc;

    // Send a JSON response with a 200 status code, a cookie containing the JWT, and the user object
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true, // Set the cookie to be http-only, meaning it can only be accessed by the server
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// This function handles the sign-in process using Google authentication
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    // If the user exists, generate a JSON Web Token (JWT) using the user's ID and admin status
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );

      // Remove the password property from the user object and store the rest in a variable called rest
      const { password, ...rest } = user._doc;

      // Send a JSON response with a 200 status code, a cookie containing the JWT, and the user object
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true, // Set the cookie to be http-only, meaning it can only be accessed by the server
        })
        .json(rest);
    } else {
      // If the user does not exist, generate a random password and hash it
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      // Create a new user with a randomly generated username, the hashed password, and the provided profile picture
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      // Save the new user to the database
      await newUser.save();

      // Generate a JWT using the new user's ID and admin status
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );

      // Remove the password property from the new user object and store the rest in a variable called rest
      const { password, ...rest } = newUser._doc;

      // Send a JSON response with a 200 status code, a cookie containing the JWT, and the new user object
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true, // Set the cookie to be http-only, meaning it can only be accessed by the server
        })
        .json(rest);
    }
  } catch (error) {
    // If an error occurs, pass it to the error handler
    next(error);
  }
};
