import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/routes";

//create App class which is starting point of app

class App {

    public app: express.Application;
    //making route object from Route class 
    public route: Routes = new Routes();
    //this is database url 
    public mongoUrl: string = 'mongodb://todo:alpha1411@ds155862.mlab.com:55862/ultimate_todo_app'

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    //connect app with the database
    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl , {useNewUrlParser : true});    
    }

}

export default new App().app;