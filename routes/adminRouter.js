const express = require('express');
const router = express.Router();
const adminModel = require('../models/adminModel');
const generateToken = require('../utils/generateToken');

 if(process.env.NODE_ENV === 'development'){
    router.post('/create',async (req, res) => {
        try{
            let admin = await adminModel.findOne();
            if(admin){
                 res.send("Admin already exists");
                res.render('index');
            }
            let {name ,email , password} = req.body;
            let newAdmin = await adminModel.create({
                name,
                email,
                password
            })
            const token = generateToken(newAdmin);
            res.cookie('token',token);
            res.render('adminDashboard');
        }catch(err){
        res.status(500).send(err.message);
        }
})
}else{
    router.post('/create',async (req, res) => {
        res.status(403).send("Forbidden");
    });
    }

router.get('/', (req, res) => {
    res.render('admin');
});

router.get('/createProduct', (req, res) => {
    let success = req.flash('success');
    res.render('createproducts',{success});
});


module.exports = router;