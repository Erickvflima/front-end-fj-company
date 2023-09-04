import React from 'react';
import clsx from 'clsx';
import { Box } from '@mui/material';
import useStyles from './styles';

export const Label = ({
  children,
  color = 'secondary',
  textTransform = 'uppercase',
  sx,
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx([classes[color]])} sx={{ textTransform, ...sx }}>
      {children}
    </Box>
  );
};

export default Label;

Label.defaultProps = { textTransform: 'uppercase', sx: undefined };
