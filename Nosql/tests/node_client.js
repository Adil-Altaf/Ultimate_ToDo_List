const grpc = require('grpc');
const protoPath = require('path').join(__dirname, '..', 'proto','todo.proto');
const proto = grpc.load(protoPath);

const client = new proto.todopkg.TodoService('localhost:8080', grpc.credentials.createInsecure());

// client.List({}, (error, response) => {
// 	if (!error) {
// 		console.log("Response : ", response)
// 	}
// 	else {
// 		console.log("Error:", error.message);
// 	}
// });

client.Insert(
    {
      todo_id: parseInt(Math.random() * 100),
      title: "Run fast",
	  description: "run faster than I can",
	  done: false
    },
    (error, response) => {
      if (!error) {
        expect(response).not.toBeNull();
      } else {
        console.log("Error:", error.message);
      }
    }
  );