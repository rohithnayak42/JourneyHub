const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    let token;

    // Check for Bearer token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    // Mock token support when DB is down
    if (!getIsConnected() && token === 'mock_token_abc123') {
      req.user = { id: 'mock_u_1', name: 'Mock User', email: 'mock@example.com' };
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found. Token invalid.' });
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is invalid or expired.' });
  }
};

module.exports = { protect };
