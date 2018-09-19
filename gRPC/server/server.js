'use strict';

const fs = require('fs');
const grpc = require('grpc');
const implementation = require('./serverImplementation');

const PROTO_PATH = 'pb/messages.proto';
const serviceDef = grpc.load(PROTO_PATH);
const PORT = 9000;
const server = new grpc.Server();

server.addProtoService(serviceDef.UserService.service, {
    getTaskbyId: implementation.getByUserId,
    getAllTasks: implementation.getAllTasks,
    save: implementation.save,
    delete: implementation.delete,

});
server.bind(`0.0.0.0:${PORT}`, credentials);
console.log(`Starting server on port ${PORT}`);
server.start();