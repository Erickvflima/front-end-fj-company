import React, { useEffect, useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { v4 as uuidv4 } from 'uuid';
import { Stack } from '@mui/system';
import FakePage from '../../../../pages/FakePage';
// import logo from 'assets/images/logo_clara.png';
import routes from '../../../../routes';
import Footer from '../../../Footer';
import NavItem from './NavItem';
import MenuOptions from './MenuOptions';

const drawerWidth = 300;

const Main = styled('main', {
  shouldForwardProp: (prop) => {
    return prop !== 'open';
  },
})(({ theme, open }) => {
  return {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  };
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => {
    return prop !== 'open';
  },
})(({ theme, open }) => {
  return {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

const DrawerHeader = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0.5),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  };
});

const ResponsiveDrawer = () => {
  // eslint-disable-next-line no-undef
  console.log('aquiii');
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const isDownLgScreen = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    if (isDownLgScreen) {
      setOpen(false);
    }
  }, [isDownLgScreen]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        elevation={0}
        sx={{
          borderRadius: 0,
          height: '80px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(3px)',
          boxShadow:
            'rgba(34, 51, 84, 0.2) 0px 2px 8px -3px, rgba(34, 51, 84, 0.1) 0px 5px 22px -4px',
          color: (t) => {
            return t.palette.primary.light;
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }), color: 'white' }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexGrow: 1 }}
          >
            <Typography variant="h6" noWrap component="div">
              Portal
            </Typography>
            <MenuOptions />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#004668',
            borderRadius: '0px 15px 15px 0px',
            background: '#004668',
            backgroundImage:
              'linear-gradient(180deg,rgba(0, 0, 0, 0.2) 100%, rgba(255, 255, 255, 0.3) 0%)',
            boxShadow: '3px 8px 8px 4px rgba(0, 0, 0, 0.5)',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Box padding={3}>
              logo
              {/* <img
                alt="Logo"
                src={logo}
                style={{ width: '100px', marginLeft: '15px' }}
              /> */}
            </Box>
            <Box paddingTop={3}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon color="secondary" />
                ) : (
                  <ChevronRightIcon color="secondary" />
                )}
              </IconButton>
            </Box>
          </Stack>
        </DrawerHeader>

        <NavItem />
      </Drawer>
      <Main open={open} sx={{ backgroundColor: '#f2f5f9' }}>
        <DrawerHeader />
        <Box mb={2} />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          sx={{ height: '92vh' }}
        >
          <Grid item xs={12}>
            <Routes>
              {
                // eslint-disable-next-line no-undef
                console.log('aquiii')
              }
              {routes.map(({ isPrivate, path, component: Component }) => {
                // eslint-disable-next-line no-undef
                console.log(routes);
                // eslint-disable-next-line no-undef
                console.log(isPrivate);
                if (isPrivate) {
                  return (
                    <Route path={path} element={Component} key={uuidv4()} />
                  );
                }
                return false;
              })}
              <Route path="*" element={<FakePage />} />
            </Routes>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}
            >
              <Footer />
            </Box>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
};

export default ResponsiveDrawer;
