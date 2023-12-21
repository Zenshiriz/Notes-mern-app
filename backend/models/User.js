const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:50,
        required:[true, "please provide a name"],
    },
    email:{
        type:String,
        required:[true, "please provide a email address"],
        minlength:3,
        maxlength:50,
        unique:true
    },
    
    password:{
        type:String,
        minlength:6,
        required:[true, "please provide a password"],
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }    
})

module.exports =  mongoose.model('user', UserSchema)