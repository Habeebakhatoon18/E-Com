const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
    },
    email : String,
    password : String,
    cart : {
        type : Array,
        default : []
    },
    orders : { 
        type : Array,
        default : []
    },
    picture :String
})
module.exports  = mongoose.model('User',userSchema);