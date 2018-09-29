const grpc = require("grpc");
const proto = grpc.load("proto/todos.proto");
const server = new grpc.Server();
const todosServices = require("../db/todos");
const pg_1 = require('pg');
const postUrl = {
  connectionString: "postgres://ddikzxbv:DlqNo0yu2o5e1ZbadxuDcMjt8TIy9VuF@baasu.db.elephantsql.com:5432/ddikzxbv",
  ssl: true,
}
var client = new pg_1.Client(postUrl);
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  // connection established
  client.query(
    "SELECT NOW()",
    (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log("Postgresql server started at", result.rows[0].now);
      client.end();
    }
  );
});
server.addService(proto.TodosService.service, {
  List(_, callback) {
    todosServices.list(callback);
  },
  Insert(call, callback) {
    let todo = new todosServices(call.request);
    todo.add(callback);
  },
  Remove(call, callback) {
    let todo = new todosServices(call.request.id);
    todo.remove(callback)
  },
  Get(call, callback) {
    let todo = new todosServices(call.request.id);
    todo.fetchTodo(callback);
  },
  Update(call, callback) {
    let todo = new todosServices(call.request);
    todo.update(callback);
  },
  DoneTodo(call, callback) {
    let todo = new todosServices(call.request);
    todo.doneTodo(callback);
  }
});


server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:50051");
server.start();
