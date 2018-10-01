const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('todo', todoSchema);