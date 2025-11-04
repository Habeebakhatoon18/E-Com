
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    req.flash('error', 'Please login first');
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findOne({ email: decoded.email }).select('-password');
    
    if (!user) {
      res.clearCookie('token'); // user not found
      req.flash('error', 'User not found, please log in again');
      return res.redirect('/');
    }

    req.user = user;
    res.locals.isLoggedIn = true; // ✅ now available in EJS templates
    next();

  } catch (err) {
    res.clearCookie('token'); // ✅ prevents infinite loop
    req.flash('error', 'Session expired, please log in again');
    return res.redirect('/');
  }
};
