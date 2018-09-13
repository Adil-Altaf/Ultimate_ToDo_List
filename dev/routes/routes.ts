import {Request, Response} from "express";

export class Routes {      
    public routes(app): void {          
        app.route('/todo/api/v1.0/tasks')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })               
    }
}