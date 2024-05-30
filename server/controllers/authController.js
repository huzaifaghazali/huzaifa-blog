import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

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
    next();
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
