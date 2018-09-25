import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const NavBar = (props) => {
    return (
        <div>
            <AppBar position="static" style={{backgroundColor:'purple'}} >
                <Toolbar style={{textAlign:'center',margin:'auto'}}>
                    <Typography variant="title" color="inherit" >
                        {props.children}
                    </Typography>
                </Toolbar>
            </AppBar>
            
        </div>
    )
}

export default NavBar;