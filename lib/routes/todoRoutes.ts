// /lib/routes/crmRoutes.ts

import {Request, Response} from "express";

export class Routes {    
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Contact 
        app.route('/todo') 
        // GET endpoint 
        .get((req: Request, res: Response) => {
        // Get all contacts            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })        
        // POST endpoint
        .post((req: Request, res: Response) => {   
        // Create new contact         
            res.status(200).send({
                message: 'POST request successfulll!!!!'
            })
        })

        // Contact detail
        app.route('/todo/:todoid')
        // get specific contact
        .get((req: Request, res: Response) => {
        // Get a single contact detail            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        .put((req: Request, res: Response) => {
        // Update a contact           
            res.status(200).send({
                message: 'PUT request successfulll!!!!'
            })
        })
        .delete((req: Request, res: Response) => {       
        // Delete a contact     
            res.status(200).send({
                message: 'DELETE request successfulll!!!!'
            })
        })
    }
}
