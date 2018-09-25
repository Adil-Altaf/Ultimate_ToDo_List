import React, { Component } from 'react';
import '../../Style/todo.css';

class Todo extends Component {

    //Initlize The Component State
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            todos: []
        }
        this.submitForm = this.submitForm.bind(this);
    }
    //To Handle Input
    updateTitle(title) {
        this.setState({ title: title })
    }
    //To Handle Input
    updateDescription(description) {
        this.setState({ description: description });
    }
    //To Submit Form
    submitForm(e) {
        e.preventDefault();
        const { title, description, todos } = this.state;
        todos.push({ title, description, completed: false });
        this.setState({ todos, title: '', description: '' });
    }
    //To delete a specific todo
    deleteList(index) {
        const { todos } = this.state;
        let updated = todos.filter((item, index1) => {
            if (index1 !== index) {
                return true
            }
            else{
                return false
            }

        });
        this.setState({ todos: updated })
        console.log(updated);


    }
    //To Edit a specific todo
    edit(index) {
        const { todos } = this.state;
        todos[index].completed = !todos[index].completed;
        this.setState(todos);
    }
    //input field for title and description
    inputField() {
        const { title, description } = this.state;
        return (//Creating from of Title And Description
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
        return (//Todo List 
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
        return (
            <div style={{ textAlign: "center" }} >
                <h1>
                    TodoApp
                </h1>
                {this.inputField()}
                {this.unorderList()}
            </div>
        )
    }
}
export default Todo;