const grpc = require("grpc");
const mongoose = require("mongoose");
const proto = grpc.load("proto/todos.proto");
const server = new grpc.Server();
const todosServices = require("../db/todos");
mongoose
    .connect(
        "mongodb://ali448:hideit90@ds115263.mlab.com:15263/todolistdb",
        {
            useNewUrlParser: true
        }
    )
    .then(() => {
        console.log("Server started...");
    })
    .catch(err => {
        console.log(err.message);
    });
server.addService(proto.TodosService.service, {
    List(_, callback) {
        todosServices.list(callback);
    },
    Insert(call, callback) {
        let todo = new todosServices(call.request);
        todo.add(callback);
    },
    remove(call, callback) {
        let todo = new todosServices(call.request.id);
        todo.remove(callback);
    },
    Get(call, callback) {  
        let todo = new todosServices(call.request.id);
        todo.fetch(callback);
    },
    Update(call, callback) {
        let todo = new todosServices({
            id: call.request.id,
            title: call.request.title,
            description: call.request.description
        });
        todo.update(callback);
    },
    DoneTodo(call, callback) {
        let todo = new todosServices({
            id: call.request.id,
            done: call.request.done
        });
        todo.doneTodo(callback);
    }
});


server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:50051");
server.start();
