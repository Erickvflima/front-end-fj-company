import React from 'react';
import { Container, Grid } from '@mui/material';
import CustomizedBreadcrumbs from '../CustomBreadCrumb';

const PageBody = ({ children, breadCrumb }) => {
  return (
    <Container maxWidth="xl" sx={{ height: '100vh' }}>
      <Grid container direction="column" spacing={2}>
        {breadCrumb ? (
          <Grid item>
            <CustomizedBreadcrumbs breadCrumb={breadCrumb} />
          </Grid>
        ) : (
          <Grid item>{/* <span>span</span> */}</Grid>
        )}
        <Grid item>
          <div
            style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
          >
            {children}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

PageBody.defaultProps = { breadCrumb: undefined };
export default PageBody;
