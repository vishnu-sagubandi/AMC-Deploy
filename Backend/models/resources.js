const mongoose = require('mongoose');

const resourcesSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    type: {
        type: String, //data type
        required: true
    },
    drive_link:{
        type: String,
        required: false
    },
    youtube_link:{
        type: String,
        required: false
    },
    date:{
        type:Date,
        default: Date.now
    }
})

// type- SAE Aero, Aerobatics, Swarm, Aerial Robotics, General(workshop vid + ppt), blog
// Fb link (req false)

module.exports = mongoose.model('Resources', resourcesSchema);