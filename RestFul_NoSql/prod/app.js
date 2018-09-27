"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes_1 = require("./routes/routes");
//create App class which is starting point of app
class App {
    constructor() {
        //making route object from Route class 
        this.route = new routes_1.Routes();
        //this is database url 
        this.mongoUrl = 'mongodb://alpha:alpha12345@ds125932.mlab.com:25932/ultimate_todo';
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    //connect app with the database
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                console.log(err);
            }
            console.log('connect!!!');
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map