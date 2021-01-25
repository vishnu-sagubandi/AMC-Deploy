const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: Number,
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
    day:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: false
    },
    venue:{
        type: String,
        required: false
    },
    day_number:{
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Events', eventSchema);