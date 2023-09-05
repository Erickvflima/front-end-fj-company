import React from 'react';
import { Grid, Typography } from '@mui/material';
import List from './List';

const UserManagement = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
      spacing={6}
    >
      <Grid item>
        <Typography variant="h4" color="primary" gutterBottom>
          Cadastro de usuarios
        </Typography>
      </Grid>
      <Grid item>
        <List />
      </Grid>
    </Grid>
  );
};

export default UserManagement;
