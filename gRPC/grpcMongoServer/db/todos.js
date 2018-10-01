const todoModel = require("../models/todos");

class Todo {

  constructor(payload) {
    this.payload = payload;
  }

  static list(cb) {
    const criteria = {};
    const projections = {
      _id: 0,
      __v: 0
    };
    const options = {
      lean: true
    };
    todoModel.find(criteria, projections, options).then((response) => {
      cb(null, response);
    }).catch((error) => {
      cb(error, null)
    })
  }

  add(cb) {
    todoModel(this.payload).save().then(() => {
      cb(null, this.payload)
    }).catch((err) => {
      cb(err, null)
    });
  }

  fetch(cb) {
    const criteria = { id: this.payload };
    const projections = {
      _id: 0,
      __v: 0
    };
    const options = {
      lean: true
    };
    todoModel.findOne(criteria, projections, options).then((response) => {
      cb(null, response);
    }).catch((err) => {
      cb(err, null)
    })
  }

  remove(cb) {
    todoModel.deleteOne({ id: this.payload }).then((response) => {
      cb(null, 'Successfully deleted')
    }).catch((err) => {
      cb(err, null)
    });
  }
  update(cb) {
    const options = {
      lean: true
    };
    todoModel.findOneAndUpdate({ id: this.payload.id }, {
      $set: {
        title: this.payload.title,
        description: this.payload.description
      }
    }, options).then((response) => {
      cb(null, this.payload)
    }).catch((err) => {
      cb(err, null)
    })
  }

  doneTodo(cb) {
    const options = {
      lean: true
    };
    todoModel.findOneAndUpdate({ id: this.payload.id }, {
      $set: {
        done: this.payload.done
      }
    }, options).then((response) => {
      cb(null, this.payload)
    }).catch((err) => {
      cb(err, null)
    })
  }
}

module.exports = Todo;