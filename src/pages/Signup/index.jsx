import React from 'react';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';
import {
  Button,
  TextField,
  Grid,
  Link,
  Paper,
  Typography,
  MenuItem,
} from '@mui/material';
import Label from '../../components/Label';
import { customTextColor } from '../../utils/colorText.js';
import { maskCpf } from '../../utils/string/masks';

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      typeOfAccess: 'Colaborador',
      teamId: '',
      status: 'Ativo',
    },
    validationSchema,
    onSubmit: async (values) => {
      // eslint-disable-next-line no-undef
      console.log(values);
    },
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
      margin={2}
    >
      <Paper elevation={3}>
        <Grid item xs={12}>
          <Grid container direction="column" padding={3} alignItems="center">
            <form onSubmit={formik.handleSubmit}>
              <Grid item>
                <Grid container direction="column" spacing={2}>
                  <Grid item padding={2}>
                    <Typography variant="h4" color="primary">
                      Cadastro de Colaborador
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Nome"
                      name="name"
                      autoFocus
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      fullWidth
                      id="cpf"
                      label="CPF"
                      name="cpf"
                      inputProps={{ maxLength: 14 }}
                      value={maskCpf(formik.values.cpf)}
                      onChange={(event) => {
                        formik.setFieldValue(
                          'cpf',
                          event.target.value.replace(/\D/g, ''),
                        );
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                      helperText={formik.touched.cpf && formik.errors.cpf}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      fullWidth
                      id="typeOfAccess"
                      label="Tipo de Acesso"
                      name="typeOfAccess"
                      value={formik.values.typeOfAccess}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.typeOfAccess &&
                        Boolean(formik.errors.typeOfAccess)
                      }
                      helperText={
                        formik.touched.typeOfAccess &&
                        formik.errors.typeOfAccess
                      }
                      select
                    >
                      <MenuItem value="Colaborador">
                        <Label color={customTextColor('Colaborador')}>
                          Colaborador
                        </Label>
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      fullWidth
                      id="teamId"
                      label="Equipe"
                      name="teamId"
                      value={formik.values.teamId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      select
                      error={
                        formik.touched.teamId && Boolean(formik.errors.teamId)
                      }
                      helperText={formik.touched.teamId && formik.errors.teamId}
                    >
                      <MenuItem value="Comercial">
                        <Typography variant="body2">Comercial</Typography>
                      </MenuItem>
                      <MenuItem value="Venda">
                        <Typography variant="body2">Venda</Typography>
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      fullWidth
                      id="status"
                      label="Status"
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.status && Boolean(formik.errors.status)
                      }
                      helperText={formik.touched.status && formik.errors.status}
                      select
                    >
                      <MenuItem value="Ativo">
                        <Label color={customTextColor('Ativo')}>ATIVO</Label>
                      </MenuItem>
                      <MenuItem value="Inativo">
                        <Label color={customTextColor('Inativo')}>
                          INATIVO
                        </Label>
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Cadastrar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs>
                  <Link href="/signin" variant="body2">
                    Já tem uma conta? Faça login
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Signup;
