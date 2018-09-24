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
    done : {
      backgroundImage: 'linear-gradient(to left, #f4f4f4, #d5d5d5, #b8b7b7, #9c999a, #807d7d);',
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
    title : props.task.todotitle,
    description : props.task.tododescription,
    id : props.task.id,
    done : props.task.complete
  }
  return (
    <MuiThemeProvider theme = {theme} >
    <div className = {props.classes.mainContainer} >
      <Paper  elevation = {10} className = {!task.done ? props.classes.root : props.classes.done} >
      <h5>{task.title}</h5>
      <p>{task.description}</p>
      <div className = {props.classes.icons} >
      {!task.done ? (
        <div>
         <IconButton onClick = {() => props.deleteTask(task.id)} color = 'primary'>
         <Delete/>
       </IconButton>
       <IconButton onClick = { ()=> props.openDialog(task)} color = 'primary'>
         <Edit/> 
       </IconButton>
       <IconButton onClick = {()=> props.doneTask(task.id)} color = 'primary'>
         <Done/>
       </IconButton> 
       </div>
      ) : (<div>
        <span>Done</span> 
        <IconButton onClick = {() => props.deleteTask(props.id)} color = 'primary'>
        <Delete/>
      </IconButton>
      </div>
      )}
      </div>
      </Paper>
    </div>
    </MuiThemeProvider>
  )
}

export default withStyles(styles)(TaskItem);

