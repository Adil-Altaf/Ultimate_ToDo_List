export {};
const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../app").default;
var expect = chai.expect;
chai.use(chaiHttp);

describe("API Routes", function() {
  describe("getTodos GET /api/v1.0/tasks", function() {
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

  describe("getTodos GET /api/v1.0/tasks", function() {
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
  

  describe("getTodoWithID GET /api/v1.0/tasks/:id", function() {
    it("should return one task", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks/1")
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("getTodoWithID GET /api/v1.0/tasks/:id", function() {
    it("should return one task and get an array", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks/1")
        .then(function (res) {
          expect(res.body).to.be.a('array');
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("POST /api/v1.0/tasks", function() {
    it("should post tasks", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          _method: "post",
          todoTitle: "123",
          todoDescription: "123",
          complete: false
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

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should post and get json confirmation", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "123",
          todoDescription: "123",
        })
        .then(function (res) {
          expect(res.body).to.eql({success: true, msg: 'Todo Added Successfully'});
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should not post because title is missing", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoDescription: "123",
        })
        .then(function (res) {
          expect(res.body).to.eql({ success: false, error: "Title is Missing" });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should not post because Description is missing", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "123",
        })
        .then(function (res) {
          expect(res.body).to.eql({ success: false, error: "Description is Missing" });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should not post because Title and Description fields are missing", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
        })
        .then(function (res) {
          expect(res.body).to.eql({ success: false, error: "Both fields are Missing" });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo //400
    it("should not post because Title is missing and returning status 400 (Bad Request)", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoDescription: "123",
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

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo //400
    it("should not post because Description is missing and returning status 400 (Bad Request)", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "123",
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

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo //400
    it("should not post because Title and Description fields are missing and returning status 400 (Bad Request)", function(done) {
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

  describe("PUT /api/v1.0/tasks/:id", function() {
    it("should update all tasks", function(done) {
      chai
        .request(server)
        .put("/todo/api/v1.0/tasks/3")
        .set("X-API-Key", "foobar")
        .send({
          _method: "put",
          todoTitle: "123",
          todoDescription: "123",
          complete: false
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

  describe("DELETE /api/v1.0/tasks/:id", function() {
    it("should delete all tasks", function(done) {
      chai
        .request(server)
        .delete("/todo/api/v1.0/tasks/1")
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

});
