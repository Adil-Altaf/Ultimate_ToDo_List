import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


class Home extends Component {
  constructor(){
    super()
    this.state = {
      animation : null
    }
  }

  componentWillUnmount(){
    this.setState({
      animation : "animated fadeInLeft delay-2s"
    })
    console.log(this.state.animation)
  }
 gotoTask = ()=>{
   setTimeout(()=>{
    this.props.history.push('/tasks')
   } , 1000)
    }
  render() {
    return (
      <div
      className = {this.state.animation}
       style = {styles.container} 
       >
      <div style = {styles.main}>
      <h3>ULTIMATE TODO APP</h3>
      <p style = {styles.alignRight}>created by team alpha</p>
      <Button
      fullWidth = {true}
      onClick ={this.gotoTask}
      variant="contained" >
        Let's Go
      </Button>
      </div>
    </div>
    )
  }
}

const styles = {
  container :{
    backgroundImage: 'linear-gradient(to top, #484464, #446189, #2d81a8, #00a1bb, #10c1c1)',
    width : '100%',
    height : '100vh'
  },
  main : {
    color : 'white',
    position : 'absolute',
    top : '50%',
    left : '50%',
    transform : 'translate(-50% , -50%)',
  }, 
  alignRight:{
    textAlign : 'right'
  }
  
}

export default withRouter(Home);

