export {};
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app").default;
var expect = chai.expect;
import * as mongoose from "mongoose";
chai.use(chaiHttp);
var ID, TITLE, DESCRIPTION, DONE;

describe("API Routes", function() {

  describe('Test for Databse Connectivity', function(){
    it('should connect to database', function(done){
      mongoose.connect('mongodb://alpha:alpha12345@ds125932.mlab.com:25932/ultimate_todo' , {useNewUrlParser : true}, (err, client) => {
        if (err) {
          console.log(err);
        }
        done();
      });   
     
    });
});

describe("getAllTask GET /api/v1.0/tasks", function() {
  it("should return all tasks and get status 200", function(done) {
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

describe("getAllTask GET /api/v1.0/tasks", function() {
  it("should return all tasks and get an array", function(done) {
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

describe("addNewTask POST /api/v1.0/tasks", function() {
  it("should post tasks and return status 200", function(done) {
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
        ID = res.body._id;
        TITLE = res.body.title;
        DESCRIPTION = res.body.description;
        DONE = res.body.done;
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post if Title and Description are missing", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
      })
      .then(function (res) {
        expect(res.body).to.eql({ success: false, msg: "Title and Description is Missing!" });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because Description is missing", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        title: "todo title!",
      })
      .then(function (res) {
        expect(res.body).to.eql({ success: false, msg: "Description is Missing!" });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because title is missing", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        description: "Description length must be greater than 20!",
      })
      .then(function (res) {
        expect(res.body).to.eql({ success: false, msg: "Title is Missing!" });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because Description length must be greater than 20", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        title: "Working with Heroku Database!! YES!!!",
        description: "hello"
        })
      .then(function (res) {
        expect(res.body).to.eql({ success: false, msg: "Description length must be greater than 20!" });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because Description is empty", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        title: "todo title",
        description: ""
        })
      .then(function (res) {
        expect(res.body).to.eql({ success: false, msg: "Description is Missing!" });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because title is empty", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        title: "",
        description: "Description length must be greater than 20"
        })
      .then(function (res) {
        expect(res.body).to.eql({ success: false, msg: "Title is Missing!" });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

//statuses

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post if Title and Description are missing and get status 400", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
      })
      .then(function (res) {
        expect(res).to.have.status(400);
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because Description is missing and get status 400", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        title: "todo title!",
      })
      .then(function (res) {
        expect(res).to.have.status(400);
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because title is missing and get status 400", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        description: "Description length must be greater than 20!",
      })
      .then(function (res) {
        expect(res).to.have.status(400);
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because Description length must be greater than 20 and get status 400", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        title: "Working with Heroku Database!! YES!!!",
        description: "hello"
        })
      .then(function (res) {
        expect(res).to.have.status(400);
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because Description is empty and get status 400", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        title: "todo title",
        description: ""
        })
      .then(function (res) {
        expect(res).to.have.status(400);
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("addNewTask /api/v1.0/tasks", function() {
  //addNewTodo
  it("should not post because title is empty and get status 400", function(done) {
    chai
      .request(server)
      .post("/todo/api/v1.0/tasks")
      .set("X-API-Key", "foobar")
      .send({
        title: "",
        description: "Description length must be greater than 20"
        })
      .then(function (res) {
        expect(res).to.have.status(400);
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("getTask GET /api/v1.0/tasks/:id", function() {
  it("should return one task", function(done) {
    chai
      .request(server)
      .get("/todo/api/v1.0/tasks/"+ID)
      .then(function (res) {
        expect(res).to.have.status(200);
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("getTask GET /api/v1.0/tasks/:id", function() {
  it("should return and include title, description & complete", function(done) {
    chai
      .request(server)
      .get("/todo/api/v1.0/tasks/"+ID)
      .then(function (res) {
        expect(res.body).to.be.an('object');
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("getTask GET /api/v1.0/tasks/:id", function() {
  it("should return and include title, description & complete", function(done) {
    chai
      .request(server)
      .get("/todo/api/v1.0/tasks/"+ID)
      .then(function (res) {
        expect(res.body).to.be.an('object').that.includes({
          _id: ID,
          title: TITLE,
          description: DESCRIPTION,
          done: DONE
        });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("updateTodo PUT /api/v1.0/tasks/:id", function() {
  it("should update one task and get status 200", function(done) {
    chai
      .request(server)
      .put("/todo/api/v1.0/tasks/"+ID)
      .set("X-API-Key", "foobar")
      .send({
        title: TITLE,
        description: DESCRIPTION,
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

describe("updateTodo PUT /api/v1.0/tasks/:id", function() {
  it("should update one task and get array in return", function(done) {
    chai
      .request(server)
      .put("/todo/api/v1.0/tasks/"+ID)
      .set("X-API-Key", "foobar")
      .send({
        title: TITLE,
        description: DESCRIPTION,
      })
      .then(function (res) {
        expect(res.body).to.be.a('object');
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("updateTodo PUT /api/v1.0/tasks/:id", function() {
  it("should not update one task and get null (404) in return", function(done) {
    chai
      .request(server)
      .put("/todo/api/v1.0/tasks/5baa4f0d52123200157a9c73")
      .set("X-API-Key", "foobar")
      .send({
        title: "123",
        description: "Description length must be greater than 20!",
      })
      .then(function (res) {
        expect(res).to.have.status(404);
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("updateTodo PUT /api/v1.0/tasks/:id", function() {
  it("should not update one task and get error message", function(done) {
    chai
      .request(server)
      .put("/todo/api/v1.0/tasks/5baa4f0d52123200157a9c73")
      .set("X-API-Key", "foobar")
      .send({
        title: "123",
        description: "Description length must be greater than 20!",
      })
      .then(function (res) {
        expect(res.body).to.eql({ message: 'Task Not Found!' });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("updateTodo PUT /api/v1.0/tasks/:id", function() {
  it("should not update one task and get error message because desc length is not 20", function(done) {
    chai
      .request(server)
      .put("/todo/api/v1.0/tasks/"+ID)
      .set("X-API-Key", "foobar")
      .send({
        title: "123",
        description: "hello",
      })
      .then(function (res) {
        expect(res.body).to.eql({ success: false, msg: "Description length must be greater than 20!" });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("DELETE /api/v1.0/tasks/:id", function() {
  it("should delete one task and return json object", function(done) {
    chai
      .request(server)
      .delete("/todo/api/v1.0/tasks/"+ID)
      .then(function (res) {
        expect(res.body).to.eql({ message: 'Successfully deleted Task!' });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("DELETE /api/v1.0/tasks/", function() {
  it("should not delete one task and return status 404 if not found", function(done) {
    chai
      .request(server)
      .delete("/todo/api/v1.0/tasks/5baa4f0d52123200157a9c73")
      .then(function (res) {
        expect(res).to.have.status(404);
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

describe("DELETE /api/v1.0/tasks/", function() {
  it("should not delete one task and return status 404 if not found", function(done) {
    chai
      .request(server)
      .delete("/todo/api/v1.0/tasks/5baa4f0d52123200157a9c73")
      .then(function (res) {
        expect(res.body).to.eql({ message: 'Task Not Found!' });
        done();
     })
     .catch(function (err) {
        throw err;
     });
  });
});

});
