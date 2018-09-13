import {Request, Response} from "express";

export class Routes {      
    public routes(app): void {     

        app.route('/todo/api/v1.0/tasks')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        app.route('/todo/api/v1.0/tasks') 
        .post((req: Request, res: Response) => {           
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        }) 
        
        app.route('/todo/api/v1.0/tasks/:task_id')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        .put((req: Request, res: Response) => {          
                res.status(200).send({
                    message: 'PUT request successfulll!!!!'
                })
         })

         .delete((req: Request, res: Response) => {
             
                res.status(200).send({
                    message: 'DELETE request successfulll!!!!'
                })
        })
    }
}