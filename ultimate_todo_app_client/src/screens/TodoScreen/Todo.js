import React, { Component } from 'react';

class Todo extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: ''
        }
    }

    updateTitle(title){
        console.log(title);
        this.setState({title:title}) 
    }

    inputField() {
        const { title, description } = this.state;
        return (
            <form className="form" >
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



    render() {
        return (
            <div style={{ textAlign: "center" }} >
                <h1>
                    TodoApp
                </h1>
                {this.inputField()}
            </div>
        )
    }
}
export default Todo;