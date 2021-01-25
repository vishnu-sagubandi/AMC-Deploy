const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    month:{
        type: Number,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    month_number:{         //Gets month number according considering January, 2014 as the first month.
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Achievements', achievementSchema);