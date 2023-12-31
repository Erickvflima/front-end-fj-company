/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import { Helmet } from 'react-helmet-async';
import logo from '../../assets/images/logo.png';
import CustomBackDrop from '../../components/CustomBackDrop';
import { useNavigate } from 'react-router-dom';
import validationSchema from './validationSchema';
import { sendSignin } from '../../store/ducks/User';
import { maskCpf } from '../../utils/string/masks';

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
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
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => {
    return state.user;
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { cpf: '' },
    validationSchema,
    onSubmit: async (values) => {
      setOpen(true);
      const {
        meta: { requestStatus },
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
    },
  });

  useEffect(() => {
    if (user && user.sendSignin?.document?.typeOfAccess?.length > 0) {
      if (user.sendSignin?.document?.typeOfAccess === 'Colaborador') {
        navigate('/randomMessages', { replace: true });
      } else if (user.sendSignin?.document?.typeOfAccess === 'Lider') {
        navigate('/TeamMessages', { replace: true });
      } else if (user.sendSignin?.document?.typeOfAccess === 'Administrador') {
        navigate('/UserManagement', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user]);

  return (
    <>
      <CustomBackDrop open={open} />
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={false}
          lg={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundSize: '200px',
            backgroundRepeat: 'no-repeat',
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
            <Box sx={{ mt: 1, maxWidth: '280px' }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  inputProps={{ maxLength: 14 }}
                  autoFocus
                  value={maskCpf(formik.values.cpf)}
                  onChange={async (event) => {
                    formik.setFieldValue(
                      'cpf',
                      event.target.value.replace(/\D/g, ''),
                    );
                  }}
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
                    <Link href="/signup" variant="body2">
                      Cadastrar colaborador?
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
