import React from 'react';
import {Paper , IconButton} from '@material-ui/core';
import {Delete , Edit , Done} from '@material-ui/icons';
import theme from '../MuiCustomColor/MuiCustom';
import { withStyles , MuiThemeProvider } from "@material-ui/core/styles";

const styles = theme =>
  console.log(theme) || {
    root : {
      marginBottom : '20px',
      width : '800px',
      height : '115px',
      padding : "20px"
    },
    icons : {
      display : 'flex',
      justifyContent : 'flex-end',
      marginTop : '-30px'
    }
  }

const TaskItem = (props) => {
  const task = {
    title : props.task.title,
    description : props.task.description,
    id : props.id
  }
  return (
    <MuiThemeProvider theme = {theme} >
    <div className = {props.classes.mainContainer} >
      <Paper elevation = {10} className = {props.classes.root} >
      <h5>{props.task.title}</h5>
      <p>{props.task.description}</p>
      <div className = {props.classes.icons} >
      <IconButton onClick = {() => props.deleteTask(props.id)} color = 'primary'  >
        <Delete/>
      </IconButton>
      <IconButton onClick = { ()=> props.openDialog(task)} color = 'primary' >
        <Edit/>
      </IconButton>
      <IconButton color = 'primary' >
        <Done/>
      </IconButton>
      </div>
      </Paper>
    </div>
    </MuiThemeProvider>
  )
}

export default withStyles(styles)(TaskItem);


{/* // <p>{props.task.time}</p>
// {props.task.done ? <span>done</span> : <span></span>}
/
// <button >edit</button>
// <button>done</button>
// <i class="material-icons">
// create
// </i> */}
