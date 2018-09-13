import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description : {
        type : String,
        required : true,
        minlength : 20
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    done :{
        type :Boolean,
        default : false
    }
});