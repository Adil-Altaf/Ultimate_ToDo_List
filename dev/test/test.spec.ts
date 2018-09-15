export {};
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app').default;
// const { Client } = require("pg");
chai.use(chaiHttp);

describe('API Routes', function() {
    describe('GET /api/v1.0/tasks', function() {
        it('should return all tasks', function(done) {
          chai.request(server)
          .get('/todo/api/v1.0/tasks')
          .end(function(err, res) {
            res.should.have.status(200);
          done();
          });
        });
      });


      describe('POST /todo/api/v1.0/tasks/:id', function() {
        it('should return tasks by id', function(done) {
          chai.request(server)
          .get('/todo/api/v1.0/tasks/5b9b8017aac1cc0be067d9f4')
          .end(function(err, res) {
            res.should.have.status(200);
          done();
          });
        });
      });

      describe('PUT /todo/api/v1.0/tasks/:id', function() {
        it('should update tasks by id', function(done) {
          chai.request(server)
          .put('/todo/api/v1.0/tasks/5b9b8017aac1cc0be067d9f4')
          .set('done',true)
          .end(function(err, res) {
            res.should.have.status(200);
          done();
          });
        });
      });

      describe('DELETE /todo/api/v1.0/tasks/:id', function() {
        it('should delete tasks by id', function(done) {
          chai.request(server)
          .delete('/todo/api/v1.0/tasks/5b9b8019aac1cc0be067d9f7')
          .end(function(err, res) {
            res.should.have.status(200);
          done();
          });
        });
      });
});