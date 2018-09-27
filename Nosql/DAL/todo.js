let dbModel = require("../models/todo");
let Todo = class {
  constructor(payload) {
    this.payload = payload;
    }
  add(callback) {
    new dbModel(this.payload).save(callback);
  }
  static list(callback) {
    const criteria = {};
    const projections = {
      _id: 0,
      __v: 0
    };
    const options = {
      lean: true
    };
    dbModel.find(criteria, projections, options, callback);
  }
  updateOne(object, callback) {
    const criteria = { $set: this.payload };
    console.log(this.payload.done + " from update");
    return dbModel.findOneAndUpdate(
      { todo_id: this.payload.todo_id },
      {
        $set: {
          done: this.payload.done
        }
      },
      callback
    );
  }
  remove(object,callback) {
    const criteria = this.payload;
    dbModel.findOneAndRemove(criteria,callback)
  }
};
module.exports = Todo;