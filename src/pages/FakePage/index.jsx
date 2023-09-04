// import { Box } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import React from 'react';
// import notFound from '../../assets/images/notFound.jpeg';

const FakePage = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ height: '50vh' }}
      spacing={2}
      justifyItems="center"
    >
      <Grid item marginTop="20vh">
        <Typography variant="h4" color="primary">
          404 - Página não encontrada
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" color="primary">
          A página que você está procurando não existe.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FakePage;
