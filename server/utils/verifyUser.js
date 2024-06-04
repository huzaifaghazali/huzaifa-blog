import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

// Middleware function to verify the user's authentication by checking the access token in the cookies.
// export const verifyUser = (req, res, next) => {

//   // Extract the access token from the cookies
//   const token = req.cookies.access_token;

//   // If the token is not present, send a 401 error
//   if (!token) {
//     return next(errorHandler(401, 'Unauthorized'));
//   }

//   // Verify the token using the JWT_SECRET environment variable
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       // If the token is invalid, send a 401 error
//       return next(errorHandler(401, 'Unauthorized'));
//     }

//     // If the token is valid, add the user object to the request object
//     req.user = user;
//     next();
//   });
// };

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};
