import React, { Component } from 'react';
import TaskItem from '../taskItem/TaskItem';
import {connect} from 'react-redux';
import {getTasksRequest , deleteTaskRequest , updateTaskRequest , doneTaskRequest} from '../../store/actions/todoActions';
import UpdateDialog from '../dialog/Dialog';
import Spinner from '../spinner/Spinner';
class TaskList extends Component {
  constructor(props){
    super(props)
    this.state = {
      task : {
        id : '',
        title : '',
        description : ''
      },
      dialog : false
    }
    this.props.getTasksRequest()
  }

  //this is for update Dialog
  openDialog = (task)=>{
    this.setState({
      dialog : true,
      task : {...task}
    })
  }

  //After updating task
  closeDialog = () =>{
    this.setState({dialog : false})
  }
  render() {
    
    const {tasks , isloading } = this.props;
    let content;

    if(!tasks && isloading){
      content = (
        <div>Loading....</div>
      )
    }else{
      content =(
        tasks.map((task) =>{
          return(
            <TaskItem
             doneTask = {this.props.doneTaskRequest}
             openDialog = {this.openDialog} 
             deleteTask = {this.props.deleteTaskRequest} 
             key={task.id}
             task = {task}
             />
          )
        })
      )
    }
    return (
      <div style = {styles.taskContainer} >
         {content}
         {this.state.dialog ?  <UpdateDialog updateTask = {this.props.updateTaskRequest} task = {this.state.task} closeDialog = {this.closeDialog} /> : <span></span> }
      </div>
    )
  }
};
const mapStateToProps = (state) =>{
  return {
    tasks  : state.TaskReducer.tasks,
    isloading : state.TaskReducer.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasksRequest: () => dispatch(getTasksRequest()),
    deleteTaskRequest: (id) => dispatch(deleteTaskRequest(id)),
    updateTaskRequest : (updatedTask) => dispatch(updateTaskRequest(updatedTask)),
    doneTaskRequest : (task) => dispatch(doneTaskRequest(task))
  }
}

const styles = {
  taskContainer : {
    width : '100%',
    display : 'flex',
    flexDirection : 'column',
    alignItems: 'center',
    padding : '60px'
  }
};


export default connect(mapStateToProps , mapDispatchToProps )(TaskList);
