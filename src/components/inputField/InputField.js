import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addTask} from '../../store/actions/todoActions';
import { withStyles } from "@material-ui/core/styles";
import {Paper , TextField } from '@material-ui/core';


const styles = theme =>
  console.log(theme) || {
    root: {
      padding: 50,
      width: '65%',
      height : 400
    },
    textField : {
        width : '500px',
    },
    textarea : {
        width : '500px',
        overflow : 'hidden'
    }
  };
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
      const {classes} = this.props;
    return (
        <div style = {mainStyles} >
        <Paper className = {classes.root} >
        <form onSubmit = {this.sendTask} >
        <TextField
        name = "title" 
        value = {this.state.title}                
        onChange = {this.onChangeText}
        id="standard-with-placeholder"
        label="Title"
        placeholder="Enter your task title"
        className={classes.textField}
        margin="normal"
      />

       <TextField
        name = 'desc'
       value = {this.state.desc}
       onChange = {this.onChangeText}
       id="standard-multiline-flexible"
       label="Description"
       placeholder = "Enter your Description"
       multiline
       rowsMax="4"
        className={classes.textarea}
        margin="normal"
      />
        <input 
        type = "submit"
        value = "add"
        />
        </form>
      </Paper>
      </div>
    )
  }
};

const mainStyles = {
    height : '100vh',
    display: 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems: 'center'
}
export default    withStyles(styles)(connect(null , {addTask})(InputField));
