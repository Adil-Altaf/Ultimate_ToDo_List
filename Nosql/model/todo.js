const Mongoose = require("mongoose");

const todo = new Mongoose.Schema({
    todo_id: {
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
    required: true
  }
});
module.exports = Mongoose.model("todo", todo);