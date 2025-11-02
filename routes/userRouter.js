const express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/authController');

router.get('/', (req, res) => {
    res.send('user route working');
});

router.post('/register',registerUser);

router.post('/login', loginUser);

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('user logged out successfully');
    return res.redirect('/shop');
});

module.exports = router;