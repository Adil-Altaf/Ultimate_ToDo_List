import {Request, Response} from "express";
import { TaskController } from "../controllers/control";


//This is class to handle all the app routes
export class Routes {

    //Initialize object with the task Controller class
    public taskController: TaskController = new TaskController();
    public routes(app): void {
        
        //GET all task from database
        app.route('/todo/api/v1.0/tasks')
        .get(this.taskController.getAllTask)
        

        //POST route is for sending data to database
        app.route('/todo/api/v1.0/tasks') 
        .post(this.taskController.addNewTask) 
        
        //GET single task by giving an ID 
        app.route('/todo/api/v1.0/tasks/:task_id')
        .get(this.taskController.getTask)


        //UPDATE single task by giving an ID and updated data 
        .put(this.taskController.updateTask)


        //DELETE single task and return a success message
         .delete(this.taskController.deleteTask)
    }  
}