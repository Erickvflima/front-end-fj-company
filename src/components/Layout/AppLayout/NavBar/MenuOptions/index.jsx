import React, { useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { Logout, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from 'hooks/useAppStore';
// import { clearSignin } from '../../store/ducks/Signer';
// import { clearGroupAndPermissions } from 'store/ducks/Groups';

const MenuOptions = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const { user } = useAppSelector((state) => {
  //   return state.signer.signin;
  // });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    // dispatch(clearSignin());
    // dispatch(clearGroupAndPermissions());
    handleClose();
    navigate('/signin');
  };

  return (
    <Box sx={{ display: { md: 'flex' } }}>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        // aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
          variant="square"
          sx={{ bgcolor: '#005882', borderRadius: '10px' }}
        >
          <Person />
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" color="primary" />
          </ListItemIcon>
          teste
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuOptions;
