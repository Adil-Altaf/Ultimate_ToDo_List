import React, { Component } from 'react';
import InputField from '../inputField/InputField';
import TaskList from '../taskList/TaskList';
import {Grid , Paper, withTheme} from '@material-ui/core';
import { inherits } from 'util';

class Task extends Component{
  constructor(){
    super()
    this.state = {
      taskComponent : false
    }
  }

  taskComponentChange = (val)=>{
    this.setState({taskComponent : val });
  }

  render(){
    return (
      <Grid container spacing={2}>
        <Grid xs = {3} >
        <div style = {styles.main_sidenav} >
          <h4>ULTIMATE TODO APP</h4>
          <p>created by team alpha</p>
          <p>18-Sep-2018</p>
          <span onClick = {() => this.taskComponentChange(true)}  style = {styles.taskShowButton} >All Task</span>
          <span onClick = {() => this.taskComponentChange(false)} style = {styles.taskInputButton} >Create Task</span>
        </div>
        </Grid>
        <Grid style = {styles.rightSide} xs = {9} >
        {this.state.taskComponent ?  <TaskList/> :<InputField taskComponentChange = {this.taskComponentChange} />  }
        </Grid>
      </Grid>
    )
  }
  
};


const styles ={
  main_sidenav : {
    height: '100%',
    display: 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems: 'center'
    // top : '50%',
    // transform : 'translateY(-50%)'
  },
  rightSide : {
    backgroundImage: 'linear-gradient(to top, #484464, #446189, #2d81a8, #00a1bb, #10c1c1)',
    width : '100%',
    height : '100vh',
    overflow : 'auto'
  },
  taskShowButton : {
    cursor : 'pointer',
    boxShadow: '0 2px 1px grey',
    textAlign : 'center',
    color : 'white',
    width : '100%',
    backgroundColor : '#10C1C1',
    height : 40,
    padding : 10
  },
  taskInputButton : {
    cursor : 'pointer',
    boxShadow: '0 2px 1px grey',
    textAlign : 'center',
    color : 'white',
    width : '100%',
    backgroundColor : '#484464' ,
    height : 40,
    padding : 10
  }
}
export default  Task;
