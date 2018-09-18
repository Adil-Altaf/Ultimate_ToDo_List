import React from 'react'

const TaskItem = (props) => {
  const task = {
    title : props.task.title,
    description : props.task.description,
    id : props.id
  }
  return (
    <div>
        <div>
        <h4>{props.task.title}</h4>
        <p>{props.task.description}</p>
        <p>{props.task.time}</p>
        {props.task.done ? <span>done</span> : <span></span>}
        <button onClick = {() => props.deleteTask(props.id)} >X</button>
        <button onClick = { ()=> props.openDialog(task)} >edit</button>
        <button>done</button>
        </div>
    </div>
  )
}

export default TaskItem;
