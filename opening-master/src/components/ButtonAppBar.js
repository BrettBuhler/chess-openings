import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import OpeningMasterMenu from './Menu';
import { useState } from 'react';
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google';


export default function ButtonAppBar({setDisplayMenu, displayMenu, setMode , setUser, user}) {

  const LoginButton = () => {
    if (user == 'guest') {
      return (
        <GoogleLogin
                onSuccess={res=>{
                const authenticatedUser = jwt_decode(res.credential)
                setUser({
                    name: authenticatedUser.name,
                    email: authenticatedUser.email,
                    picture: authenticatedUser.picture
                })
                }}
                onError={()=> {
                console.log('Login Failed')
                }}
       />
      )
    } else {
      return (
        <Typography>{user.email}</Typography>
      )
    }
  }
  
  const handleClick = (event) => {
    setDisplayMenu(!displayMenu)
    setMode('default')
  }

  const handleClose = (event) => {
    setDisplayMenu(false)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Opening Master
          </Typography>
          <LoginButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}