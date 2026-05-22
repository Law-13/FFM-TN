// JWT Authentication Middleware Skeleton
/*
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

      req.user = await User.findById(decoded.id).select('-password');
      if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Forbidden. Admin privileges required.' });
      }
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: 'Not authorized, token validation failed.' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token provided.' });
  }
};
*/

export const mockAuthMiddleware = (req, res, next) => {
  console.log('ℹ️ Authentication checked: Mock pass.');
  next();
};
