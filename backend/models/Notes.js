const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user:{
        required: true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true,
        minlength:[3,'enter a valid title']
    },
    description:{
        type:String,
        required:true,
        minlength:[5,'enter a valid description']
    },
    
    tag:{
        type:String,
        default:"general"
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }    
})

module.exports =  mongoose.model('notes', NotesSchema)