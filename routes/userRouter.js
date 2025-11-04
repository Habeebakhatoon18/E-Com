const express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/authController');
const isLoggedIn = require('../middlewares/isLoggedIn');
router.get('/', (req, res) => {
    res.send('user route working');
});

router.post('/register',registerUser);

router.post('/login', loginUser);

router.get('/logout', (req, res) => {
    res.clearCookie('token');
     res.locals.isLoggedIn = false;
    return res.redirect('/');
});


router.get("/cart", isLoggedIn,async (req, res) => {
  try {
    // Populate user's cart with product details
    const user = await req.user.populate("cart");

    const cartItems = user.cart || [];

    res.render("cart", { cartItems });
  } catch (err) {
    console.error(err);
    req.flash("error", "Unable to load cart");
    res.redirect("/shop");
  }
});



module.exports = router;