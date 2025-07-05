import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Checking the availability of a token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verification of a token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Checking the existence of a user in the database
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is valid but user no longer exists',
      });
    }

    // Checking user activity (optional)
    if (user.isActive === false) {
      return res.status(401).json({
        success: false,
        message: 'User account is deactivated',
      });
    }

    // Adding full user information to the req
    req.user = user;

    next();
  } catch (error) {
    // Detailed error handling by JWT
    let message = 'Invalid token';

    if (error.name === 'TokenExpiredError') {
      message = 'Token has expired';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Invalid token format';
    } else if (error.name === 'NotBeforeError') {
      message = 'Token not active yet';
    }

    return res.status(401).json({
      success: false,
      message,
    });
  }
};

export default authMiddleware;
