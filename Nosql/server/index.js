const grpc = require("grpc");
const mongoose = require("mongoose");
mongoose.connect('mongodb://admin:admin1@ds115353.mlab.com:15353/grpc');
var path=require("path")
var dalPath = path.join(__dirname, '..', 'DAL', 'todo');
var protoPath = path.join(__dirname,'..','proto','todo.proto')
const proto = grpc.load(protoPath);
const server = new grpc.Server();
const dal = require(dalPath);


server.addService( proto.todopkg.TodoService.service,{
        Insert(call,callback){
            const todo=new dal({
                todo_id: call.request.todo_id,
                title: call.request.title,
                description: call.request.description,
                done: call.request.done
            });
            todo.add(callback);
        },
        List(call,callback){
            console.log('the call back is');
            console.log(callback)
            console.log('the call  is');
            console.log(call)
            dal.list(call,callback);
        },
        update(call,callback){
            const newTodo= new dal({
                todo_id: call.request.todo_id,
                title: call.request.title,
                description: call.request.description,
                done: call.request.description
            });
            newTodo.updateOne(callback);
        }

})


server.bind("0.0.0.0:8080", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://0.0.0.0:8080");
server.start();

