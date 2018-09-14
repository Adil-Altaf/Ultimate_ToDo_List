import React, { Component } from 'react';

class Todo extends Component {
    constructor() {
        super()
    }


    inputField() {
        return (
            <form className="form" >
                <input type="text" />
                <button style={{marginLeft:5}}>
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