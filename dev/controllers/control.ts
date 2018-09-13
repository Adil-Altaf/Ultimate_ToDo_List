import * as mongoose from 'mongoose';
import { TaskSchema } from '../models/models';
import { Request, Response } from 'express';

const Task = mongoose.model('Task', TaskSchema);
export class TaskController{
public addNewTask (req: Request, res: Response) {                
        let newTask = new Task(req.body);
        newTask.save((err, task) => {
            if(err){
                res.send(err);
            }    
            res.json(task);
        });
    }

    public getAllTask (req: Request, res: Response) {           
        Task.find({}, (err, tasks) => {
            if(err){
                res.send(err);
            }
                res.json(tasks);
        });
    
    }

    public getTask (req: Request, res: Response) {           
        Task.findById(req.params.task_id, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }

    public updateTask (req: Request, res: Response) {           
        Task.findOneAndUpdate({ _id: req.params.task_id }, 
            req.body , { new: true }, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }

    public deleteTask (req: Request, res: Response) {           
        Task.remove({ _id: req.params.task_id }, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted Task!'});
        });
    }

}