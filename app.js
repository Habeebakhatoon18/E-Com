const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const parser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');
const db = require('./config/mongo-connect');

const adminRouter = require('./routes/adminRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const indexRouter = require('./routes/indexRouter');
require('dotenv').config();

app.use(parser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});