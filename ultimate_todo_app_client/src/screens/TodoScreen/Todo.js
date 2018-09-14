import React, { Component } from 'react';

class Todo extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            todos: []
        }
        this.submitForm = this.submitForm.bind(this);
    }

    updateTitle(title) {
        this.setState({ title: title })
    }

    updateDescription(description) {
        this.setState({ description: description });
    }

    submitForm(e) {
        e.preventDefault();
        const { title, description, todos } = this.state;
        todos.push({ title, description });
        this.setState({ todos, title: '', description: '' });
    }

    deleteList(index) {
        const { todos } = this.state;
        let updated = todos.filter((item, index1) => {
            if (index1 !== index) {
                return true
            }

        });
        this.setState({todos:updated})
        console.log(updated);


    }

    inputField() {
        const { title, description } = this.state;
        return (
            <form className="form" onSubmit={this.submitForm} >
                <div>
                    <label style={{ marginRight: 2 }}>
                        Title
                        <input
                            value={title}
                            onChange={(e) => this.updateTitle(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </label>
                    <label style={{ marginLeft: 2 }} >
                        Description
                        <input
                            value={description}
                            onChange={(e) => this.updateDescription(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </label>
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
            <ul>
                {todos.map((list, index) => {
                    return (
                        <li>
                            {list.title}-{list.description}
                            <button>Edit</button>
                            <button onClick={() => this.deleteList(index)} >Delete</button>
                        </li>
                    )
                })}
            </ul>
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