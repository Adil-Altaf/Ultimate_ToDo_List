"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
//Initialize Schema 
const Schema = mongoose.Schema;
//This is task Schema that is responsible for validate coming data 
exports.TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 20 // minimum length of string is 20 characters long
    },
    created_at: {
        type: Date,
        default: Date.now() //this is the time at which task will create
    },
    done: {
        type: Boolean,
        default: false
    }
});
//# sourceMappingURL=models.js.map