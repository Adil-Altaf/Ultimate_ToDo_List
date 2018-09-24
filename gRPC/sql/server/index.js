// const grpc = require('grpc');


// const proto = grpc.load('proto/work_leave.proto');

const PROTO_PATH = 'proto/todo.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
    });
var todo = grpc.loadPackageDefinition(packageDefinition).todo;

const server = new grpc.Server();

//define the callable methods that correspond to the methods defined in the protofile
 server.addService(todo.TodoServices.service, {
// /**
// Check if an employee is eligible for leave.
// True If the requested leave days are greater than 0 and within the number
// of accrued days.
// */
getAllTasks(call) {
  if (call.request.requested_leave_days > 0) {
    if (call.request.accrued_leave_days > call.request.requested_leave_days) {
      callback(null, { eligible: true });
    } else {
      callback(null, { eligible: false });
    }-1
  } else {
    callback(new Error('Invalid requested days'));
  }
}})

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:9000', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('grpc server running on port:', '0.0.0.0:9000');