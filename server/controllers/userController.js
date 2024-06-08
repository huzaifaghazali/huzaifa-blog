import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  let { username } = req.body;

  if (req.user.id !== userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters')
      );
    }

    if (username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }

  // Extract the query parameters from the request
  const { startIndex, limit, order } = req.query;

  try {
    // Parse the startIndex parameter into an integer, defaulting to 0 if it is not a valid number.
    const startingIndex = parseInt(startIndex) || 0;
    // Parse the limit parameter into an integer, defaulting to 9 if it is not a valid number.
    const maxLimit = parseInt(limit) || 9;
    // Determine the sort direction based on the order parameter, defaulting to descending order.
    const sortDirection = order === 'asc' ? 1 : -1;

    // Retrieve the users from the database, sorted by creation date in the specified direction,
    // skipping the specified number of users and limiting the number of users retrieved.
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startingIndex)
      .limit(maxLimit);

    // Remove the password property from each user object before returning it.
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    // Count the total number of users in the database.
    const totalUsers = await User.countDocuments();

    // Get the current date.
    const now = new Date();

    // Calculate the date one month ago.
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    // Count the number of users created in the previous month.
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // Return the JSON object containing the users, total users, and last month's users.
    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    // If an error occurs during the retrieval process, call the next middleware function with the error.
    next(error);
  }
};
