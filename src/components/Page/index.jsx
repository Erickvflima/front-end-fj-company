import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Grid, IconButton, Tooltip } from '@mui/material';
import CustomizedBreadcrumbs from '../components/CustomBreadCrumb';

export const Page = ({
  children,
  Icon,
  buttonRouter,
  title = '',
  breadCrumb,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container direction="column">
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            {breadCrumb ? (
              <Grid item>
                <CustomizedBreadcrumbs breadCrumb={breadCrumb} />
              </Grid>
            ) : (
              <Grid item>{/* <span>span</span> */}</Grid>
            )}
            {buttonRouter && (
              <Grid item>
                <Tooltip title={title}>
                  <IconButton
                    color="primary"
                    aria-label={title}
                    component={RouterLink}
                    to={buttonRouter}
                  >
                    <Icon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
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

Page.defaultProps = { breadCrumb: undefined };
export default Page;
