import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function NavBar(props) {

  const handleNavHomeClick = (e) => {
    props.home()
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="nav-bar">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 4 }}
            onClick={handleNavHomeClick}
          >
            Home
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* this typography is needed for spacing for some reason, removing it messes up the cart icon right alignment */}
          </Typography>
          <IconButton color="inherit"><ShoppingCartIcon className="cartIcon" /></IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}