import { Request, Response } from "express";
// import { Client } from "pg";
import { Client } from "pg";
const connectionString =
  "postgres://ycdrsdkz:VCNlVKZ--PJLCHozzG9gQVrKhU_OEJdj@stampy.db.elephantsql.com:5432/ycdrsdkz";

export class TodoController {
  public addNewTodo(req: Request, res: Response) {
    const results = [];
    const { todoTitle, todoDescription } = req.body;
    const data = {
      todoTitle,
      todoDescription,
      complete: false
    };
    var client = new Client(connectionString);
    client.connect(err => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      client
        .query(
          "INSERT INTO todoList(todoTitle, todoDescription, complete) values($1, $2, $3)",
          [data.todoTitle, data.todoDescription, data.complete]
        )
        .then(result1 => {
          client
            .query("SELECT * FROM todoList ORDER BY id asc")
            .then(result2 => {
              result2.rows.forEach(row => {
                // console.log(row);
                results.push(row);

                client
                  .end()
                  .then(() => {
                    return res.json(results);
                  })
                  .catch(err => {
                    console.log("Err: ", err);
                  });
              });
            })
            .catch(err => {
              console.log(err);
              return res.json({ success: false, data: err });
            });
        })
        .catch(err => {
          console.log(err);
          return res.json({ success: false, data: err });
        });
    });
  }

  public getTodos(req: Request, res: Response) {
    const results = [];
    var client = new Client(connectionString);
    client
      .connect()
      .then(() => {
        client
          .query("SELECT * FROM todoList ORDER BY id asc")
          .then(result2 => {
            result2.rows.forEach(row => {
              // console.log(row);
              results.push(row);

              client
                .end()
                .then(() => {
                  return res.status(200).json(results);
                })
                .catch(err => {
                  //console.log("Err: ", err);
                });
            });
          })
          .catch(err => {
            console.log(err);
            return res.json({ success: false, data: err });
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      });
  }

  public getTodoWithID(req: Request, res: Response) {
    const id = req.params.id;
    var client = new Client(connectionString);
    client
      .connect()
      .then(() => {
        client.query('SELECT * FROM todoList where id=($1)', [id]).then((result) => {
        res.status(200).json(result.rows);  
        }).catch((err) => {
          console.log(err);
        return res.status(500).json({ success: false, data: err });  
        })
      }).catch(err => {
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      });
  }

  public updateTodo(req: Request, res: Response) {
    const results = [];
    const id = req.params.id;
    const { todoTitle, todoDescription, complete } = req.body;
    const data = {
      todoTitle,
      todoDescription,
      complete
    };
    var client = new Client(connectionString);
    client
      .connect()
      .then(() => {
        client.query(
          "UPDATE todoList SET todoTitle=($1), todoDescription=($2), complete=($3) where id=($4)",
          [data.todoTitle, data.todoDescription, data.complete, id]
        );
      })
      .then(resultUpdate => {
        client
          .query("SELECT * FROM todoList ORDER BY id asc")
          .then(result2 => {
            result2.rows.forEach(row => {
              // console.log(row);
              results.push(row);

              client
                .end()
                .then(() => {
                  return res.json(results);
                })
                .catch(err => {
                  console.log("Err: ", err);
                });
            });
          })
          .catch(err => {
            console.log(err);
            return res.json({ success: false, data: err });
          });
      })
      .catch(err => {
        console.log("Update err: ", err.message);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      });
  }

  public deleteTodo(req: Request, res: Response) {
    const results = [];
    const id = req.params.id;
    var client = new Client(connectionString);
    console.log("HIT DELETE");
    client
      .connect()
      .then(() => {
        client
          .query("DELETE FROM todoList WHERE id=($1)", [id])
          .then(deleteTodo => {
            client
              .query("SELECT * FROM todoList ORDER BY id asc")
              .then(result2 => {
                result2.rows.forEach(row => {
                  // console.log(row);
                  results.push(row);

                  client
                    .end()
                    .then(() => {
                      return res.json(results);
                    })
                    .catch(err => {
                      console.log("Err: ", err);
                    });
                });
              });
          })
          .catch(err => {
            console.log(err);
            return res.status(500).json({ success: false, data: err });
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      });
  }
}
