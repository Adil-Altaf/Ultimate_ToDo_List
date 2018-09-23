import React, { Component } from 'react';
import TaskItem from '../taskItem/TaskItem';
import { connect } from 'react-redux';
import { getTasks, deleteTask, updateTask, doneTodo } from '../../store/actions/todoActions';
import UpdateDialog from '../dialog/Dialog';
class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: {
        id: '',
        title: '',
        description: ''
      },
      dialog: false
    }
  }

  componentDidMount() {
    this.props.getTasks();
  }

  openDialog = (task) => {
    this.setState({
      dialog: true,
      task: { ...task }
    })
  }
  closeDialog = () => {
    this.setState({ dialog: false })
  }
  // componentWillReceiveProps(props){
  //   this.props.getTasks()
  // }

  render() {
    const { tasks } = this.props;
    let content;

    if (!tasks) {
      content = (
        <div>Loading....</div>
      )
    } else {
      content = (
        tasks.map((task) => {
          return (
            <TaskItem
              openDialog={this.openDialog}
              deleteTask={this.props.deleteTask}
              taskDone={this.props.doneTodo}
              key={task._id}
              id={task._id}
              task={task}
            />
          )
        })
      )
    }

    return (
      <div style={styles.taskContainer} >
        {content}
        {this.state.dialog ? <UpdateDialog updateTask={this.props.updateTask} task={this.state.task} closeDialog={this.closeDialog} /> : <span></span>}
      </div>
    )
  }
};
const mapStateToProps = (state) => {
  return {
    tasks: state.TaskReducer.tasks
  }
}

const styles = {
  taskContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px'
  },

}
export default connect(mapStateToProps, { getTasks, deleteTask, updateTask, doneTodo })(TaskList);
