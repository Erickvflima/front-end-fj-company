import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import useStyles from './styles';

const CustomBackDrop = ({ open = false, sx }) => {
  const classes = useStyles();
  return (
    <Backdrop
      className={classes.backdrop}
      sx={{ zIndex: 99, ...sx }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CustomBackDrop;

CustomBackDrop.defaultProps = { sx: undefined };
