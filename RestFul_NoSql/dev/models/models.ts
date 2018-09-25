import * as mongoose from 'mongoose';

//Initialize Schema 
const Schema = mongoose.Schema;

//This is task Schema that is responsible for validate coming data 
export const TaskSchema = new Schema({
    title : {
        type: String,       //title must be string
        required: true,
    },
    description : {
        type : String,      // description must be string
        required : true,
        minlength : 20      // minimum length of string is 20 characters long
    },
    created_at: {
        type: Date,
        default: Date.now()     //this is the time at which task will create
    },
    done :{
        type :Boolean,
        default : false
    }
});