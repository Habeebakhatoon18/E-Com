const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('working');
});

router.post('/create', async (req, res) => {
    
});

module.exports = router;