import React , {Component} from 'react';
import 
{Button , DialogTitle , TextField , Dialog , DialogActions , DialogContent } 
from '@material-ui/core';
import theme from '../MuiCustomColor/MuiCustom';
import { withStyles , MuiThemeProvider } from "@material-ui/core/styles";

const styles = theme =>
  console.log(theme) || {
    dialog : {
      width : 500,
      height : 400
    },
    actions : {
      marginTop : '120px',
      marginRight : '20px'
    },
    textField : {
      width : '400px'
    }
  }



class UpdateDialog extends Component {
      constructor(props){
        super(props)
        this.state = {
          open : true,
          title : this.props.task.title,
          descrip : this.props.task.description
        }
      }

      changeInputText = (e) =>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }

      updateTask = ()=>{
        // console.log(this.state.descrip)
        const updateTask = {
          title : this.state.title,
          description : this.state.descrip,
          id : this.props.task.id
        }
        this.props.updateTask(updateTask)
        this.props.closeDialog()
      }
  render() {
    const {classes} = this.props
    return (
      <MuiThemeProvider theme = {theme} >
      <div className= {classes.root}  >
        <Dialog
          open= {this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <div className= {classes.dialog} >
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
              className = {classes.textField}
            />
            <TextField
            onChange = {this.changeInputText}
            name  = 'descrip'
            value = {this.state.descrip}
            id="standard-multiline-flexible"
            multiline
            rowsMax="4"
            margin="dense"
            label="Description"
            className = {classes.textField}
            />
          </DialogContent>
          <DialogActions className = {classes.actions} >
            <Button  variant="contained" size = 'medium' onClick={this.props.closeDialog} color="primary">
              Cancel
            </Button>
            <Button variant="contained" size = 'medium' onClick={this.updateTask} color="primary">
              Update
            </Button>
          </DialogActions>
          </div>
        </Dialog>
      </div>
      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(UpdateDialog);