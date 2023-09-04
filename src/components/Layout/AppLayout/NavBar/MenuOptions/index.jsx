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
import { clearUser } from '../../../../../store/ducks/User';
import { useDispatch, useSelector } from 'react-redux';

const MenuOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: { sendSignin },
  } = useSelector((state) => {
    return state;
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(clearUser());
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
          {sendSignin.document.name}
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
