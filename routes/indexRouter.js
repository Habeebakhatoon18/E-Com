const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/productModel');

router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('index',{error});
});

router.get('/shop', isLoggedIn ,async(req, res) => {
    let products =await productModel.find({});
    res.render('shop',{products});
});

router.get('/add-to-cart/:product_id', isLoggedIn , async(req, res) => {
    let user = req.user;
    user.cart.push(req.params.product_id);
    await user.save();
    req.flash("success","product added to cart");
    res.redirect("/shop");
});

router.get('/cart/remove/:product_id', isLoggedIn , async(req, res) => {
    let user = req.user;
    user.cart = user.cart.filter(item => item.toString() !== req.params.product_id);
    await user.save();
    req.flash("success","product removed from cart");
    res.redirect("/users/cart");
});
module.exports = router;