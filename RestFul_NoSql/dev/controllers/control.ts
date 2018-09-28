import * as mongoose from 'mongoose';
import { TaskSchema } from '../models/models';
import { Request, Response } from 'express';



//Making a model with help of Schema 
const Task = mongoose.model('Task', TaskSchema);

//we use all busineess logic in this class this is reponsible for all things
export class TaskController {

    //This logic is for add new task in database
    public addNewTask(req: Request, res: Response) {

        if(!req.body.title && !req.body.description){
            return res.status(400).json({ success: false, msg: "Title and Description is Missing!" });
        }
        
        if(!req.body.title){
            return res.status(400).json({ success: false, msg: "Title is Missing!" });
        }
        if(!req.body.description){
            return res.status(400).json({ success: false, msg: "Description is Missing!" });
        }
        
        if(req.body.description){
        if(req.body.description.length < 20){
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
    public getAllTask(req: Request, res: Response) {
        Task.find({}, (err, tasks) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(tasks);
        });

    }

    //This logic is for get an individual task by its id
    public getTask(req: Request, res: Response) {
        Task.findById(req.params.task_id, (err, task) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(task);
        });
    }

    //This logic is for update task by finding task with its id and then update with new data provided
    public updateTask(req: Request, res: Response) {
        
        if(req.body.description){
            if(req.body.description.length < 20){
                return res.status(400).json({ success: false, msg: "Description length must be greater than 20!" });
            }
        }

        Task.findOneAndUpdate({ _id: req.params.task_id },
            req.body, { new: true }, (err, task) => {
                if (err) {
                    return res.status(500).send(err);
                }

                if (!task) {
                    return res.status(404).send({ message: 'Task Not Found!' });
                }
                return res.status(200).json(task);
            });
    }
    //This logic is for delete a task by its id
    public deleteTask(req: Request, res: Response) {
        Task.findOneAndDelete({ _id: req.params.task_id }, (err, task) => {
            if (err) {
                return res.status(500).send(err);   
            }
            if(!task){
                return res.status(404).json({ message: 'Task Not Found!' });
            }
            return res.status(200).json({ message: 'Successfully deleted Task!' });
        });
    }

}