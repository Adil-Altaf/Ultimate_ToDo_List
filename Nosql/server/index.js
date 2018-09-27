const grpc = require("grpc");
const mongoose = require("mongoose");
mongoose.connect('mongodb://admin:admin1@ds113443.mlab.com:13443/grpc_api');
var path=require("path")
var dalPath = path.join(__dirname, '..', 'DAL', 'todo');
var protoPath = path.join(__dirname,'..','proto','todo.proto')
const proto = grpc.load(protoPath);
const server = new grpc.Server();
const dal = require(dalPath);


server.addService( proto.todopkg.TodoService.service,{
        Create(call,callback){
            const todo=new dal({
                id: call.request.id,
                title: call.request.title,
                description: call.request.description,
                done: call.request.done
            });
            todo.add(callback);
        },
        List(call,callback){
            dal.list(call,callback);
        },
        UpdateOne(call,callback){
            const newTodo= new dal({
                id: call.request.id,
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

