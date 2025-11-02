const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');


module.exports.registerUser = async (req, res) => {
    let { name, email, password } = req.body;
    let user = await userModel.findOne({email});
    if (user) {
        req.flash('error','user already exists');
        return res.redirect('/');
    }
    bcrypt.genSalt(10, async (err, salt) => {
        if (err) console.error(err.message);
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) console.error(err.message);
            let newUser = await userModel.create({
                name,
                email,
                password:hash
            });
            const token = generateToken(newUser);
            res.cookie('token',token);
            return res.redirect('/shop');
        }) 
});
};

module.exports.loginUser = async (req, res) => {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email:email });
        if (!user) {
            return res.redirect('/');
        }
        bcrypt.compare(password,user.password, (err, result) => {
            if(result){
                const token = generateToken(user);
                res.cookie('token',token);
                return res.redirect('/shop');
            }else{
                req.flash("error","email or password incorrect")
                return res.redirect('/');
            }
        });
        
    };