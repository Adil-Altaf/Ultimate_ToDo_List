import React , {Component} from 'react';
import 
{Button , DialogTitle , TextField , Dialog , DialogActions , DialogContent , DialogContentText} 
from '@material-ui/core';


export default class UpdateDialog extends Component {
      constructor(props){
        super(props)
        this.state = {
          open : true,
          title : props.task.title,
          desc : props.task.description
        }
      }

      changeInputText = (e) =>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }

      updateTask = ()=>{
        console.log(this.props.updateTask)
        this.props.closeDialog()
      }
  render() {
    return (
      <div>
        <Dialog
          open= {this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update</DialogTitle>
          <DialogContent>
            <TextField
              onChange = {this.changeInputText}
              value = {this.state.title}
              name = 'title'
              margin="dense"
              autoFocus
              id="name"
              label="Title"
              type="text"
              fullWidth
            />
            <TextField
            onChange = {this.changeInputText}
            name  = 'desc'
            value = {this.state.desc}
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.updateTask} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div> 
    );
  }
}