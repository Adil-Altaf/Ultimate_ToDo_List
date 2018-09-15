import * as mongoose from 'mongoose';
import { TaskSchema } from '../models/models';
import { Request, Response } from 'express';



//Making a model with help of Schema 
const Task = mongoose.model('Task', TaskSchema);

//we use all busineess logic in this class this is reponsible for all things
export class TaskController {

    //This logic is for add new task in database
    public addNewTask(req: Request, res: Response) {
        let newTask = new Task(req.body);
        newTask.save((err, task) => {
            if (err) {
                return res.send(err);
            }
            return res.json(task);
        });
    }

    //This logic is for get all the task from the database
    public getAllTask(req: Request, res: Response) {
        Task.find({}, (err, tasks) => {
            if (err) {
                return res.send(err);
            }
            return res.json(tasks);
        });

    }

    //This logic is for get an individual task by its id
    public getTask(req: Request, res: Response) {
        Task.findById(req.params.task_id, (err, task) => {
            if (err) {
                return res.status(404).send(err);
            }
            return res.json(task);
        });
    }

    //This logic is for update task by finding task with its id and then update with new data provided
    public updateTask(req: Request, res: Response) {
        Task.findOneAndUpdate({ _id: req.params.task_id },
            req.body, { new: true }, (err, task) => {
                if (err) {
                    return res.status(404).send(err);
                }
                return res.json(task);
            });
    }
    //This logic is for delete a task by its id
    public deleteTask(req: Request, res: Response) {
        Task.findOneAndDelete({ _id: req.params.task_id }, (err, task) => {
            if (err) {
                return res.status(404).send(err);   
            }
            return res.json({ message: 'Successfully deleted Task!' });
        });
    }

}