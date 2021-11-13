import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import Cart from './Cart.jsx';

export default function NavBar(props) {

  const handleNavHomeClick = (e) => {
    props.home()
  }

  const [right, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="nav-bar" >
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="medium"
            color="inherit"
            sx={{ mr: 2, ml: 4 }}
            onClick={handleNavHomeClick}
            aria-label="home-button"
          >
            Home
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* this typography is needed for spacing for some reason, removing it messes up the cart icon right alignment */}
          </Typography>
          <IconButton color="inherit" aria-label="shopping-cart">
            {/* placing onClick on IconButton causes it to trigger when trying to click out of drawer */}
            <ShoppingCartIcon className="cartIcon" aria-label="cart" onClick={toggleDrawer(true)} />
            <Drawer anchor={'right'} open={right} onClose={toggleDrawer(false)}>
              <Cart />
            </Drawer>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}