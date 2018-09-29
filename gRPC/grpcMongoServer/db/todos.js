const pg_1 = require("pg");
const postUrl = {
  connectionString:
    "postgres://ddikzxbv:DlqNo0yu2o5e1ZbadxuDcMjt8TIy9VuF@baasu.db.elephantsql.com:5432/ddikzxbv",
  ssl: true
};
class Todo {
  constructor(payload) {
    this.payload = payload;
  }

  static list(cb) {
    const results = [];
    const client = new pg_1.Client(postUrl);
    client.connect(error => {
      if (error) {
        return console.log(error);
      }
      client
        .query("SELECT * FROM todos ORDER BY id desc")
        .then(result2 => {
          result2.rows.forEach(row => {
            results.push(row);
          });
          client.end().then(() => {
            console.log(results);
            cb(null, results);
          });
        })
        .catch(err => {
          return cb(err, null);
        });
    });
  }
  add(cb) {
    const client = new pg_1.Client(postUrl);
    client.connect(error => {
      if (error) {
        return console.log(error);
      }
      client
        .query(
          "INSERT INTO todos(title, description, done) values($1, $2, $3) RETURNING id",
          [this.payload.title, this.payload.description, this.payload.done]
        )
        .then(resultId => {
          let id = resultId.rows[0].id;
          client
            .query("SELECT * FROM todos where id=($1)", [id])
            .then(result => {
              client.end().then(() => {
                cb(null, result.rows[0]);
              });  
            });
        })
        .catch(err => {
          return cb(err, null);
        });
    });
  }
  remove(cb) {
    const client = new pg_1.Client(postUrl);
    client.connect(() => {
      client
        .query("DELETE FROM todos WHERE id=($1)", [this.payload])
        .then(response => {
          client.end().then(() => {
            cb(null, "Successfully deleted");
          });
        })
        .catch(err => {
          return cb(err, null);
        });
    });
  }
  fetchTodo(cb) {
    const client = new pg_1.Client(postUrl);
    client.connect(error => {
      if (error) {
        return console.error(error);
      }
      client
        .query("SELECT * FROM todos where id=($1)", [this.payload])
        .then(result => {
          // if (!result.rows[0]) {
          //   return cb(null, );
          // }
          client.end().then(() => {
            cb(null, result.rows[0]);
          });
        })
        .catch(err => {
          return cb(err, null);
        });
    });
  }
  update(cb) {
    const { title, description, id } = this.payload;
    const client = new pg_1.Client(postUrl);
    client.connect(() => {
      client
        .query("UPDATE todos SET title=($1), description=($2) where id=($3)", [
          title,
          description,
          id
        ])
        .then(result => {
          client
            .query("SELECT title, description, id FROM todos where id=($1)", [
              id
            ])
            .then(updatedResult => {
              client.end();
              cb(null, updatedResult.rows[0]);
            });
        })
        .catch(err => {
          cb(err, null);
        });
    });
  }
  doneTodo(cb) {
    const { done, id } = this.payload;
    const client = new pg_1.Client(postUrl);
    client.connect(() => {
      client
        .query("UPDATE todos SET done=($1) where id=($2)", [done, id])
        .then(result => {
          client
            .query("SELECT done, id FROM todos where id=($1)", [id])
            .then(updatedResult => {
              client.end();
              cb(null, updatedResult.rows[0]);
            });
        })
        .catch(err => {
          cb(err, null);
        });
    });
  }
}

module.exports = Todo;
