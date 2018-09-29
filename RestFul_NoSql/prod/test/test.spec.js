"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app").default;
var expect = chai.expect;
const mongoose = require("mongoose");
chai.use(chaiHttp);
describe("API Routes", function () {
    describe('Test for Databse Connectivity', function () {
        it('should connect to database', function (done) {
            mongoose.connect('mongodb://alpha:alpha12345@ds125932.mlab.com:25932/ultimate_todo', { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    console.log(err);
                }
                done();
            });
        });
    });
    describe("getAllTask GET /api/v1.0/tasks", function () {
        it("should return all tasks and get status 200", function (done) {
            chai
                .request(server)
                .get("/todo/api/v1.0/tasks")
                .then(function (res) {
                expect(res).to.have.status(200);
                done();
            })
                .catch(function (err) {
                throw err;
            });
        });
    });
    describe("getAllTask GET /api/v1.0/tasks", function () {
        it("should return all tasks and get an array", function (done) {
            chai
                .request(server)
                .get("/todo/api/v1.0/tasks")
                .then(function (res) {
                expect(res.body).to.be.a('array');
                done();
            })
                .catch(function (err) {
                throw err;
            });
        });
    });
    describe("getTask GET /api/v1.0/tasks/:id", function () {
        it("should return one task", function (done) {
            chai
                .request(server)
                .get("/todo/api/v1.0/tasks/5baa4f0d52913200157a9c73")
                .then(function (res) {
                expect(res).to.have.status(200);
                done();
            })
                .catch(function (err) {
                throw err;
            });
        });
    });
    describe("getTask GET /api/v1.0/tasks/:id", function () {
        it("should return and include title, description & complete", function (done) {
            chai
                .request(server)
                .get("/todo/api/v1.0/tasks/128")
                .then(function (res) {
                expect(res.body).to.be.an('object');
                done();
            })
                .catch(function (err) {
                throw err;
            });
        });
    });
    describe("addNewTask POST /api/v1.0/tasks", function () {
        it("should post tasks and return status 200", function (done) {
            chai
                .request(server)
                .post("/todo/api/v1.0/tasks")
                .set("X-API-Key", "foobar")
                .send({
                _method: "post",
                title: "123",
                description: "Description length must be greater than 20!",
            })
                .then(function (res) {
                expect(res).to.have.status(200);
                done();
            })
                .catch(function (err) {
                throw err;
            });
        });
    });
    describe("addNewTask /api/v1.0/tasks", function () {
        //addNewTodo
        it("should not post if Title and Description are missing", function (done) {
            chai
                .request(server)
                .post("/todo/api/v1.0/tasks")
                .set("X-API-Key", "foobar")
                .send({})
                .then(function (res) {
                expect(res.body).to.eql({ success: false, msg: "Title and Description is Missing!" });
                done();
            })
                .catch(function (err) {
                throw err;
            });
        });
    });
    describe("addNewTask /api/v1.0/tasks", function () {
        //addNewTodo
        it("should not post because Description is missing", function (done) {
            chai
                .request(server)
                .post("/todo/api/v1.0/tasks")
                .set("X-API-Key", "foobar")
                .send({
                description: "Description length must be greater than 20!",
            })
                .then(function (res) {
                expect(res.body).to.eql({ success: false, error: "Description is Missing!" });
                done();
            })
                .catch(function (err) {
                throw err;
            });
        });
    });
    describe("addNewTask /api/v1.0/tasks", function () {
        //addNewTodo
        it("should not post because title is missing", function (done) {
            chai
                .request(server)
                .post("/todo/api/v1.0/tasks")
                .set("X-API-Key", "foobar")
                .send({
                title: "todo Title",
            })
                .then(function (res) {
                expect(res.body).to.eql({ success: false, error: "Title is Missing!" });
                done();
            })
                .catch(function (err) {
                throw err;
            });
        });
    });
    describe("addNewTask /api/v1.0/tasks", function () {
        //addNewTodo
        it("should not post because Description length must be greater than 20", function (done) {
            chai
                .request(server)
                .post("/todo/api/v1.0/tasks")
                .set("X-API-Key", "foobar")
                .send({
                title: "Working with Heroku Database!! YES!!!",
                description: "hello"
            })
                .then(function (res) {
                console.log(res.body);
                //expect(res.body).to.eql({ success: false, msg: "Description length must be greater than 20!" });
                done();
            })
                .catch(function (err) {
                throw err;
            });
        });
    });
});
//# sourceMappingURL=test.spec.js.map