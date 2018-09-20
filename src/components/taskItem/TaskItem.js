import React from 'react';
import {Paper , IconButton} from '@material-ui/core';
import {Delete , Ed} from '@material-ui/icons';

import { withStyles } from "@material-ui/core/styles";

const styles = theme =>
  console.log(theme) || {
    root : {
      width : '800px',
      height : '110px',
      padding : "10px"
    }
  }

const TaskItem = (props) => {
  const task = {
    title : props.task.title,
    description : props.task.description,
    id : props.id
  }
  return (
    <div className = {props.classes.mainContainer} >
      <Paper elevation = {10} className = {props.classes.root} >
      <h5>{props.task.title}</h5>
      <p>{props.task.description}</p>
      
      </Paper>
        <div>
        <p>{props.task.time}</p>
        {props.task.done ? <span>done</span> : <span></span>}
        <button onClick = {() => props.deleteTask(props.id)} >X</button>
        <button onClick = { ()=> props.openDialog(task)}>edit</button>
        <button>done</button>
        <i class="material-icons">
create
</i>
        </div>
    </div>
  )
}

export default withStyles(styles)(TaskItem);
