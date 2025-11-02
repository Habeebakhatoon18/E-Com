const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
if(!req.cookies.token){
    req.flash('error','please login first');
    return res.redirect('/');
}
try{
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const user = await userModel.findOne({email: decoded.email}).select('-password');
    
    req.user = user;
    next();
}catch(err){
    res.flash('error','something went wrong');
    return res.redirect('/');
}
}