const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/productModel');

router.get('/', (req, res) => {
    res.render('working');
});

router.post('/create',upload.single('image'), async (req, res) => {
    
    let imageBuffer = req.file ? req.file.buffer : null;
    let{name, price, discount} = req.body;
    let product = await productModel.create({
        image :imageBuffer ,
        name,
        price,
        discount
    });
    req.flash('success','Product created successfully');
    return res.redirect('/admin/createProduct');
});

module.exports = router;