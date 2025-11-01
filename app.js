const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const parser = requie('cookie-parser');

app.use(parser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send('working');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});