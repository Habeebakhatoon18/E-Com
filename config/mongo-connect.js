const mongoose = require('mongoose');

const dbPath = process.env.dbURL || 'mongodb://localhost:27017/ecommerce';
mongoose
.connect(dbPath)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

module.exports = mongoose.connection;