const mongoose = require('mongoose');

const alumSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    por:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    facebook:{
        type:String,
    },
    instagram:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    portfolio:{
        type:String,
    },
})

module.exports = mongoose.model('Alum', alumSchema);