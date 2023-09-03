/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import { Helmet } from 'react-helmet-async';

import CustomBackDrop from '../../components/CustomBackDrop';
// import useStyles from './styles';
import validationSchema from './validationSchema';
import { sendSignin } from '../../store/ducks/User';

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://google.com.br/">
        Erick Lima
      </Link>
      &#160;
      {new Date().getFullYear()}
    </Typography>
  );
};

const Signin = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  // const classes = useStyles();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { cpf: '' },
    validationSchema,
    onSubmit: async (values) => {
      setOpen(true);
      const {
        meta: { requestStatus },
        payload,
      } = await dispatch(sendSignin(values.cpf));
      if (requestStatus === 'fulfilled') {
        enqueueSnackbar('Usuario logado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar('Usuario ou senha inválida!', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
      setOpen(false);
      // eslint-disable-next-line no-undef
      console.log(payload);
    },
  });

  return (
    <>
      <CustomBackDrop open={open} />
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* <Backdrop className={classes.backdrop} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop> */}
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={false}
          lg={7}
          sx={{
            // backgroundImage: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '25% 8%',
            backgroundColor: '#004668',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cpf"
                  label="cpf"
                  name="cpf"
                  autoFocus
                  value={formik.values.cpf}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                  helperText={formik.touched.cpf && formik.errors.cpf}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  ENTRAR
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => {
                        // eslint-disable-next-line no-undef
                        console.log('teste');
                      }}
                    >
                      Cadastrar usuario?
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signin;
