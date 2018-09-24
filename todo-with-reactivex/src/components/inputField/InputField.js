import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addTaskRequest , getTasksRequest} from '../../store/actions/todoActions';
import {withStyles } from "@material-ui/core/styles";
import {Paper , TextField , Button} from '@material-ui/core';
import {MuiThemeProvider } from "@material-ui/core/styles";
import theme from '../MuiCustomColor/MuiCustom';


const styles = theme =>
  console.log(theme) || {
    mainStyles :{
        height : '100vh',
        display: 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems: 'center'
    },
    root: {
      padding: 50,
      width: '65%',
      height : 400
    },
    textField : {
        width : '500px',
    },
    buttonContainer : {
        height : '180px',
        width : '100%',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'flex-end',
        alignItems: 'flex-end'
    },
    button : {
        backgroundColor : '#10C1C1',
        margin : 5
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
        const task = {
            title : this.state.title,
            description : this.state.desc,
        }

        this.props.addTaskRequest(task)
        this.setState({
            title : '',
            desc : ''
        })
        this.props.getTasksRequest();
        this.props.taskComponentChange(true)
    }
  render() {
      const {classes} = this.props;
    return (
        <MuiThemeProvider theme = {theme}>
        <div className = {classes.mainStyles} >
        <Paper className = {classes.root} >
        <form onSubmit = {this.sendTask} >
        <TextField
        name = "title" 
        label = 'Title'
        value = {this.state.title}        
        onChange = {this.onChangeText}
        id="standard-with-placeholder"
        placeholder="Enter your task title"
        className={classes.textField}
        margin="normal"
      />

       <TextField
       name = 'desc'
       value = {this.state.desc}
       onChange = {this.onChangeText}
       label="Description"
       placeholder = "Enter your Description"
       id="standard-multiline-flexible"
       multiline
       rowsMax="4"
       className={classes.textField}
       margin="normal"
      />
    
    <div className = {classes.buttonContainer} >
      <Button onClick = {() => this.props.taskComponentChange(true)} variant="contained" size = 'large' color="primary" className = {classes.button}>
        Cancle
      </Button>
      <Button type = 'submit' variant="contained" size = 'large' color="primary" className = {classes.button}>
        ADD
      </Button>
      </div> 
      </form>
      </Paper>
      </div>
      </MuiThemeProvider>
    )
  }
};

const mapDispatchToProps = dispatch => {
    return {
      addTaskRequest: (task) => dispatch(addTaskRequest(task)),
      getTasksRequest : () => dispatch(getTasksRequest())
    }
  }
export default withStyles(styles)(connect(null , mapDispatchToProps)(InputField));
