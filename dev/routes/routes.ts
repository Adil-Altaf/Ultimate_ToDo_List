import {Request, Response} from "express";
import { TaskController } from "../controllers/control";

export class Routes {
    public taskController: TaskController = new TaskController();
    public routes(app): void {

        app.route('/todo/api/v1.0/tasks')
        .get(this.taskController.getAllTask)
        
        app.route('/todo/api/v1.0/tasks') 
        .post(this.taskController.addNewTask) 
        
        app.route('/todo/api/v1.0/tasks/:task_id')
        .get(this.taskController.getTask)
        
        .put(this.taskController.updateTask)

         .delete(this.taskController.deleteTask)
    }  
}