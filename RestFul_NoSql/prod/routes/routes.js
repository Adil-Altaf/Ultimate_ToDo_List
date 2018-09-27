"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const control_1 = require("../controllers/control");
//This is class to handle all the app routes
class Routes {
    constructor() {
        //Initialize object with the task Controller class
        this.taskController = new control_1.TaskController();
    }
    routes(app) {
        //GET all task from database
        app.route('/todo/api/v1.0/tasks')
            .get(this.taskController.getAllTask);
        //POST route is for sending data to database
        app.route('/todo/api/v1.0/tasks')
            .post(this.taskController.addNewTask);
        //GET single task by giving an ID 
        app.route('/todo/api/v1.0/tasks/:task_id')
            .get(this.taskController.getTask)
            //UPDATE single task by giving an ID and updated data 
            .put(this.taskController.updateTask)
            //DELETE single task and return a success message
            .delete(this.taskController.deleteTask);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map