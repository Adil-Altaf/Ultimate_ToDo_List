import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addTask} from '../../store/actions/todoActions';

class InputField extends Component {
    constructor(props){
        super(props)
        this.state = {
            title : '',
            desc : ''
        }
    }

    onChangeText = (e) => this.setState({
        [e.target.name] : e.target.value
        })

    sendTask = (e) =>{
        e.preventDefault()
        const date = new Date()
        const hour = date.getHours();
        const min = date.getMinutes();
        const time = `${hour} : ${min}`
        const task = {
            title : this.state.title,
            description : this.state.desc,
            done : false,
            time : time
        }
        this.props.addTask(task)
        this.setState({
            title : '',
            desc : ''
        })
    }
  render() {
    return (
      <div>
        <form onSubmit = {this.sendTask} >
        <input type = 'text' 
        name = "title" 
        value = {this.state.title}
        onChange = {this.onChangeText}
        />
        <textarea 
        name = 'desc'
        value = {this.state.desc}
        onChange = {this.onChangeText}
        >
            Enter your Description
        </textarea>
        <input 
        type = "submit"
        value = "add"
        />
        </form>
      </div>
    )
  }
};

export default connect(null , {addTask})(InputField);
