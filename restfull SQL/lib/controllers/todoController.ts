import { Request, Response } from "express";
import { Client } from "pg";
const connectionString = {
  connectionString: "postgres://rdgqlzgqkeuxqz:8b89bd358daa419edf7f5f8b879cde3fd53db22b6eb42f0aa3be51b6de8390a4@ec2-54-225-241-25.compute-1.amazonaws.com:5432/d7knd1j7cm9u4c",
  ssl: true,
}
  //"postgres://ycdrsdkz:VCNlVKZ--PJLCHozzG9gQVrKhU_OEJdj@stampy.db.elephantsql.com:5432/ycdrsdkz";

export class TodoController {
  public addNewTodo(req: Request, res: Response) {
    const results = [];
    const { todoTitle, todoDescription } = req.body;
    const data = {
      todoTitle,
      todoDescription,
      complete: false
    };

    if (!todoTitle && !todoDescription) {
      return res.status(400).json({ success: false, error: "Both fields are Missing" });
    }

    if (!todoTitle) {
      return res.status(400).json({ success: false, error: "Title is Missing" });
    }
    if (!todoDescription) {
      return res.status(400).json({ success: false, error: "Description is Missing" });
    }

    const client: any = new Client(connectionString);
    client.connect(error => {
      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      client
        .query(
          "INSERT INTO todoList(todoTitle, todoDescription, complete) values($1, $2, $3) RETURNING id",
          [data.todoTitle, data.todoDescription, data.complete]
        )
        .then((resultId) => {
          let id = resultId.rows[0].id

          client.query('SELECT * FROM todoList where id=($1)', [id]).then((result) => {
            console.log(result.rows[0]);
            client.end()
          .then(()=> res.status(200).send([result.rows[0], {success: true, msg: 'Todo Added Successfully'}]));
          })
        })
        .catch(err => {
          return res.json({ success: false, data: err.message });
        });
    });
  }

  public getTodos(req: Request, res: Response) {
    const results = [];
    const client = new Client(connectionString);
    client.connect(error => {
        if (error) {
          return res.status(500).json({ success: false, error: error });
        }
        client.query("SELECT * FROM todoList ORDER BY id desc")
          .then(result2 => {
            result2.rows.forEach(row => {
              results.push(row);
            });
            client.end()
          .then(()=> res.status(200).json(results));
          })
          .catch(err => {
            return res.json({ success: false, data: err.message });
          });
      })
  }

  public getTodoWithID(req: Request, res: Response) {
    const id = req.params.id;
    var client = new Client(connectionString);
    client.connect((error) => {

      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      client.query('SELECT * FROM todoList where id=($1)', [id]).then((result) => {
        if(!result.rows[0]){
          return res.status(404).json({ success: false, msg: "Task Not Found!" });  
        }
        client.end()
          .then(()=> {
            return res.status(200).json(result.rows)
          });
      }).catch((err) => {
      return res.status(500).json({ success: false, data: err.message });  
      })
    });
  }

  public updateTodo(req: Request, res: Response) {
    const id = req.params.id;
    const { todoTitle, todoDescription, complete } = req.body;
    const data = {
      todoTitle,
      todoDescription,
      complete
    };
    const client = new Client(connectionString);
    client.connect(() => {
      client.query(
        "UPDATE todoList SET todoTitle=($1), todoDescription=($2), complete=($3) where id=($4)",
        [data.todoTitle, data.todoDescription, data.complete, id]
      ).then(err => {
        client.end()
          .then(()=> res.status(200).json({ success: true, msg: "UPDATED!" }));

      }).catch(err => {
        return res.status(500).json({ success: false, data: err.message });
      });
    })
  }

  public deleteTodo(req: Request, res: Response) {
    const id = req.params.id;
    var client = new Client(connectionString);
    client.connect(() => {
        client.query("DELETE FROM todoList WHERE id=($1)", [id])
        .then(err => {
          client.end()
          .then(()=> res.status(200).json({ success: true, msg: "DELETED!" }));
        })
        .catch(err => {
          return res.status(500).json({ success: false, data: err.message });
        });
      })
  }
}