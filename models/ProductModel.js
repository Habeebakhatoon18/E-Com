const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image : String,
    name : String,
    price : Number,
    discount :{
        type: Number,
        default: 0
    },
    bgColor : String,
    PanelColor: String,
    textColor: String
})

module.exports  = mongoose.model('Product',productSchema);