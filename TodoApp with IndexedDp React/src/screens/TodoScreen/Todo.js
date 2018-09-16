import React, { Component } from 'react';
import '../../Style/todo.css';
import db from './dexie';
import TodoList from './TodoList';

class Todo extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            todos: [],
            exist: false
        }
        this.submitForm = this.submitForm.bind(this);
        this.edit = this.edit.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    componentDidMount() {
        const { exist } = this.state;
        db.table('todos')
            .toArray()
            .then((todos) => {

                console.log(todos.length);

                console.log(exist);

                if (todos.length === 1) {
                    if (todos[0].todo.length > 1 || todos.length > 0) {
                        this.setState({ exist: true })
                        this.setState({ todos: todos[0].todo });
                    }
                }

            });
    }



    updateTitle(title) {
        this.setState({ title: title })
    }

    updateDescription(description) {
        this.setState({ description: description });
    }

    submitForm(e) {
        e.preventDefault();
        const { title, description, todos, exist } = this.state;
        console.log(exist);

        todos.push({ title, description, completed: false });
        let todo = todos
        if (!exist) {
            db.table('todos')
                .add({ id: 1, todo })
                .then((id) => {
                    console.log(id);
                    this.setState({ exist: true })
                });
        } else {
            db.table('todos')
                .update(1, { todo })
                .then((x) => {
                    console.log(x);
                });
        }


        this.setState({ todos, title: '', description: '' });
    }

    deleteList(index) {
        const { todos } = this.state;
        let updated = todos.filter((item, index1) => {
            if (index1 !== index) {
                return true
            }
            else {
                return false
            }

        });
        this.setState({ todos: updated })
        let todo = updated;
        console.log(updated);
        db.table('todos')
            .update(1, { todo })
            .then((x) => {
                console.log(x);
            });


    }
    edit(index) {
        const { todos } = this.state;
        todos[index].completed = !todos[index].completed;
        this.setState(todos);
        let todo = todos;
        console.log(todo);
        db.table('todos')
            .update(1, { todo })
            .then((x) => {
                console.log(x);
            });
    }

    inputField() {
        const { title, description } = this.state;
        return (
            <form className="form" onSubmit={this.submitForm} >
                <div>
                    <label style={{ marginRight: 2 }}>
                        Title
                        <input
                            required
                            value={title}
                            onChange={(e) => this.updateTitle(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </label>
                    <div>
                        <label style={{ marginLeft: 2 }} >
                            Description
                        <textarea
                                required
                                value={description}
                                onChange={(e) => this.updateDescription(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </label>
                    </div>
                </div>
                <button className="btn btn-primary">
                    Add Todo
                </button>
            </form>
        )
    }
    unorderList() {
        const { todos } = this.state;
        return (
            <div>

                <ul className='listStyle'>
                    {todos.map((list, index) => {
                        return (
                            <li key={index + list.title}>
                                {list.completed ?
                                    <span className='completed'>
                                        {list.title}-{list.description}
                                    </span>

                                    :

                                    <span className=''>
                                        {list.title}-{list.description}
                                    </span>


                                }
                                <span className="delete" >
                                    {list.completed ?
                                        <i className="fa fa-check-square-o actionButton edit1" onClick={() => this.edit(index)}></i>

                                        :

                                        <i className="fa fa-square-o actionButton edit1" onClick={() => this.edit(index)}></i>
                                    }

                                    <i className="fa fa-remove actionButton delete1" onClick={() => this.deleteList(index)} ></i>
                                </span>
                                <hr />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }



    render() {
        const {todos} = this.state;
        return (
            <div style={{ textAlign: "center" }} >
                <h1>
                    TodoApp
                </h1>
                {this.inputField()}
                {/* {this.unorderList()} */}
                <TodoList todos={todos} edit={this.edit} deleteList={this.deleteList} />
            </div>
        )
    }
}
export default Todo;