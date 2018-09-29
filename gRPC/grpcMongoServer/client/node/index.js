const grpc = require("grpc");
const protoPath = require("path").join(__dirname, "../..", "proto");
const readline = require('readline-sync');
const proto = grpc.load({ root: protoPath, file: "todos.proto" });
const client = new proto.TodosService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

console.log(`
1. Enter list for get all todos
2. Enter insert for add a todo
3. Enter delete for delete a todo
4. Enter update for update a todo
5. Enter updateDone for complete a todo
6. Enter getTodo for get a particular todo`);
let command = readline.question('Enter command ');
switch (command) {
  case 'list':
    client.List({}, (error, response) => {
      if (!error) {
        return console.log("Response(List): ", response);
      }
      console.error(error.message);
    });
    break;
  case 'insert':
    var todo_name = readline.question("Todo name? ");
    var todo_description = readline.question("Todo description? ");
    client.Insert(
      {
        title: todo_name,
        description: todo_description,
        done: false
      },
      (error, response) => {
        if (!error) {
          return console.log("Response(INSERT): ", response);
        }
        console.error("Insert error: ", error.message);
      }
    );

    break;
  case 'delete':
    var todo_id = parseInt(readline.question("Todo id? "));
    client.Remove({ id: todo_id }, (error, response) => {
      if (!error) {
        return console.log('Response(REMOVE): ', response);
      }
      console.error('Remove error: ', error.message);
    })
    break;
  case 'update':
    var todo_id = parseInt(readline.question("Todo id? "));
    var todo_name = readline.question("Todo name? ");
    var todo_description = readline.question("Todo description? ");
    client.Update({ id: todo_id, title: todo_name, description: todo_description }
      , (error, response) => {
        if (!error) {
          return console.log('Response(UPDATE): ', response);
        }
        console.error(`Get one todo: ${error.message}`);
      })
    break;
  case 'updateDone':
    var todo_id = parseInt(readline.question("Todo id? "));
    client.DoneTodo({ id: todo_id, done: true }, (error, response) => {
      if (!error) {
        return console.log('Response(DONETODO): ', response);
      }
      console.error(`update done todo: ${error.message}`);
    })
    break;
  case 'getTodo':
    var todo_id = parseInt(readline.question("Todo id? "));
    client.Get({ id: todo_id }, (error, response) => {
      if (!error) {
        return console.log('Response(GET): ', response);
      }
      console.error(`Get one todo: ${error.message}`);
    })
    break;
  default:
    console.log("Unknown command");
}







