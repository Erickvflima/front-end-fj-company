import { Paper, Container } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: '0px',
        width: '100%',
        padding: '20px',
        marginTop: '10px',
        height: '130px',
      }}
    >
      <Container maxWidth="xl">
        <Stack>
          <Box className={classes.styleFooter} display="flex">
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <Box sx={{ fontSize: '1rem', marginRight: '5px' }}>&#169;</Box>{' '}
            {new Date().getFullYear()} - Portal
          </Box>

          <Box className={classes.styleFooter}>(31) 98467-5300</Box>
          <Box className={classes.styleFooter}>erickvflima@gmail.com</Box>
        </Stack>
      </Container>
    </Paper>
  );
};

export default Footer;
