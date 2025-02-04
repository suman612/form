const mongoose = require('mongoose')
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true,
     
    },
    gender:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    fatherOcc:{
        type:String,
        required:true
    },
    fatherNum:{
        type:String,
        required:true
    },
    motherName:{
        type:String,
        required:true
    },
    motherOcc:{
        type:String,
        required:true
    },
    motherNum:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    activity:{
        type:[String],
        required:true
    },
    health:{
        type:String,
        required:true
    },
    feesMode:{
        type:String,
        required:true
    },
    dateOfJuining:{
        type:String,
        required:true
    },
    agree:
    { type: [String], required: true },
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model('notes',NotesSchema)