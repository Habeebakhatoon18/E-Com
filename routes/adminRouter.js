const express = require('express');
const router = express.Router();
const adminModel = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const productModel = require('../models/productModel');
const isAdmin = require('../middlewares/isAdmin');
const bcrypt = require('bcrypt');

// ✅ Only allow creating admin in development mode
if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        try {
            let existingAdmin = await adminModel.findOne();
            if (existingAdmin) {
                req.flash('error', 'Admin already exists');
                return res.redirect('/');
            }

            let { name, email, password } = req.body;
            bcrypt.genSalt(10, async (err, salt) => {
                if (err) console.error(err.message);
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) console.error(err.message);
                    let newAdmin = await adminModel.create({
                        name,
                        email,
                        password: hash,
                    });
                    res.redirect('/admin');
                });
            })
            } catch (err) {
                    console.error(err);
                    res.status(500).send(err.message);
                }
            });
    } else {
            router.post('/create', (req, res) => {
                res.status(403).send('Forbidden');
            });
}
router.post('/login', async(req, res) => {
    let error = req.flash('error');
    let {email , password} = req.body;
    let admin = await adminModel.findOne({email});
    if(admin){
        const isMatch =  bcrypt.compare(password, admin.password);
        if(isMatch){
            const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_KEY);
            res.cookie('adminToken', token);
            console.log("✅ Admin logged in, redirecting...");

            return res.redirect('/admin');
        }else{
            req.flash('error','Invalid credentials');
            return res.redirect('/admin/login');
        }
    }else{
    res.render('owner-login', { error });
    }
});

router.get('/login', (req, res) => {
    res.render('owner-login', { error: req.flash('error') });
});

router.get('/', isAdmin, async (req, res) => {
    try {
        const products = await productModel.find({});
        res.render('admin', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
});

router.get('/createProduct', isAdmin, (req, res) => {
    let success = req.flash('success', 'product created successfully');
    res.render('createproducts', { success });
});


router.get('/deleteProduct/:id', isAdmin, async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        req.flash('success', 'Product deleted successfully');
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting product');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('adminToken');
    req.flash('success', 'Logged out successfully');
    res.redirect('/');
});

module.exports = router;
