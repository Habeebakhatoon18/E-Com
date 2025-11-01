const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const parser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongo-connect');

const adminRouter = require('./routes/adminRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');


app.use(parser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) =>{
    res.send('working');
})

app.use('/admin', adminRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});