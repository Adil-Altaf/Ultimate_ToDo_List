// console.log('testing');
const grpc = require("grpc");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const mongoose = require("mongoose");
const protoPath = require("path").join(__dirname, "../", "proto");
const proto = grpc.load({ root: protoPath, file: "todos.proto" });
const { assert } = require("chai");
const client = new proto.TodosService(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
);
chai.use(chaiHttp);

describe("Test for database connectivity", () => {
    it("it should connect to the database", done => {
        mongoose
            .connect(
                "mongodb://ali448:hideit90@ds115263.mlab.com:15263/todolistdb",
                {
                    useNewUrlParser: true
                }
            )
            .then(() => {
                done();
            })
            .catch(err => {
                throw err;
            });
    });
});

describe("GET ALL TASKS", () => {
    it("It should get all tasks and return an array", done => {
        client.List({}, (error, response) => {
            if (!error) {
                // expect(response).to.be.a("object");
                assert.isArray(response.todos);
                return done();
            }
            throw error;
        });
    });
});

describe("POST TASK", () => {
    it("It should post task and return an object", done => {
        client.Insert(
            {
                id: parseInt(Math.random() * 1000000),
                title: "Todo Title Testing",
                description: "Todo Description Testing"
            },
            (error, response) => {
                if (!error) {
                    assert.isObject(response);
                    return done();
                }
                throw error;
            }
        );
    });
    it("It should not post task TITLE, DESCRIPTION are missing", done => {
        client.Insert(
            { id: parseInt(Math.random() * 1000000) },
            (error, response) => {
                if (!error) {
                    return console.log("response");
                }
                expect(response).to.be.undefined;
                done();
            }
        );
    });
    it("It should not post task DESCRIPTION is missing", done => {
        client.Insert(
            {
                id: parseInt(Math.random() * 1000000),
                title: "Todo 1 testing"
            },
            (error, response) => {
                if (!error) {
                    return console.log("response");
                }
                expect(response).to.be.undefined;
                done();
            }
        );
    });
    it("It should not post task TITLE is missing", done => {
        client.Insert(
            {
                id: parseInt(Math.random() * 1000000),
                description: "Todo Description Testing"
            },
            (error, response) => {
                if (!error) {
                    return console.log("response");
                }
                expect(response).to.be.undefined;
                done();
            }
        );
    });
    it("It should not post task ID is missing", done => {
        client.Insert(
            {
                title: "Todo testing 1",
                description: "Todo Description Testing"
            },
            (error, response) => {
                if (!error) {
                    return console.log("response", response);
                }
                expect(response).to.be.undefined;
                done();
            }
        );
    });
    it("It should not post task ID, TITLE, DESCRIPTION are missing", done => {
        client.Insert({}, (error, response) => {
            if (!error) {
                return console.log("response", response);
            }
            expect(response).to.be.undefined;
            done();
        });
    });
});

describe("UPDATE TASK", () => {
    it("It should update task and return an object", done => {
        client.Update(
            {
                id: 660130,
                title: "Todo Title Testing",
                description: "Todo Description Testing"
            },
            (error, response) => {
                if (!error) {
                    assert.isObject(response);
                    return done();
                }
                throw error;
            }
        );
    });
    it("It should not update task ID is missing", done => {
        client.Update(
            {
                title: "Todo Title Testing",
                description: "Todo Description Testing"
            },
            (error, response) => {
                if (!error) {
                    assert.propertyVal(response, "id", 0);
                    return done();
                }
                throw error;
            }
        );
    });
});

describe("DELETE TASK", () => {
    it("It should delete task and return an message", done => {
        client.Remove({ id: 840079 }, (error, response) => {
            if (!error) {
                assert.isObject(response);
                return done();
            }
            throw error;
        });
    });
});

describe("GET ONE TASK", () => {
    it("It should get one task and return an object", done => {
        client.Get({ id: 264566 }, (error, response) => {
            if (!error) {
                assert.isObject(response);
                return done();
            }
            throw error;
        });
    });
});

describe("UPDATE DONE", () => {
    it("It should update done and return an object", done => {
        client.DoneTodo({ id: 304004, done: true }, (error, response) => {
            if (!error) {
                assert.isObject(response);
                return done();
            }
            throw error;
        });
    });
});
