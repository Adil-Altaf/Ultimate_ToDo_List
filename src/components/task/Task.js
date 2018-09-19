import React from 'react';
import InputField from '../inputField/InputField';
import TaskList from '../taskList/TaskList';
import Grid from '@material-ui/core/Grid';

const Task = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs = {3} >
      <div style = {styles.main_sidenav} >
        <h4>ULTIMATE TODO APP</h4>
        <p>created by team alpha</p>
        <p>18-Sep-2018</p>
        <p>All Task</p>
        <p>Create Task</p>
      </div>
      </Grid>
      <Grid style = {styles.rightSide} xs = {9} >
      <InputField/>
      <TaskList/>
      </Grid>
    </Grid>
  )
};


const styles ={
  main_sidenav : {
    padding : 15,
    position : 'fixed',
    top : '50%',
    transform : 'translateY(-50%)'
  },
  rightSide : {
    backgroundImage: 'linear-gradient(to top, #484464, #446189, #2d81a8, #00a1bb, #10c1c1)',
    width : '100%',
    height : '100vh',
    overflow : 'auto'
  }
}
export default  Task;
