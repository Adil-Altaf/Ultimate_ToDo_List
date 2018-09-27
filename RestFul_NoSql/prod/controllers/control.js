"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const models_1 = require("../models/models");
//Making a model with help of Schema 
const Task = mongoose.model('Task', models_1.TaskSchema);
//we use all busineess logic in this class this is reponsible for all things
class TaskController {
    //This logic is for add new task in database
    addNewTask(req, res) {
        if (!req.body.title && !req.body.description) {
            return res.status(400).json({ success: false, msg: "Title and Description is Missing!" });
        }
        if (!req.body.title) {
            return res.status(400).json({ success: false, msg: "Title is Missing!" });
        }
        if (!req.body.description) {
            return res.status(400).json({ success: false, msg: "Description is Missing!" });
        }
        if (req.body.title === "") {
            return res.status(400).json({ success: false, msg: "Title can not be empty!" });
        }
        if (req.body.description === "") {
            return res.status(400).json({ success: false, msg: "Description can not be empty!" });
        }
        if (req.body.description) {
            if (req.body.description.length < 20) {
                return res.status(400).json({ success: false, msg: "Description length must be greater than 20!" });
            }
        }
        let newTask = new Task(req.body);
        newTask.save((err, task) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.status(200).json(task);
        });
    }
    //This logic is for get all the task from the database
    getAllTask(req, res) {
        Task.find({}, (err, tasks) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(tasks);
        });
    }
    //This logic is for get an individual task by its id
    getTask(req, res) {
        Task.findById(req.params.task_id, (err, task) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(task);
        });
    }
    //This logic is for update task by finding task with its id and then update with new data provided
    updateTask(req, res) {
        Task.findOneAndUpdate({ _id: req.params.task_id }, req.body, { new: true }, (err, task) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(task);
        });
    }
    //This logic is for delete a task by its id
    deleteTask(req, res) {
        Task.findOneAndDelete({ _id: req.params.task_id }, (err, task) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json({ message: 'Successfully deleted Task!' });
        });
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=control.js.map