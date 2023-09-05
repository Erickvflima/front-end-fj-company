import React, { useEffect, useState } from 'react';
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
import { listTeam } from '../../store/ducks/Team';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendSignup } from '../../store/ducks/User';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [teams, setTeams] = useState([]);
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(listTeam({ status: 'Ativo' }));
      setTeams(payload.document);
    })();
  }, []);

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
      const {
        payload,
        meta: { requestStatus },
      } = await dispatch(sendSignup(values));
      if (requestStatus === 'fulfilled' && payload.status === 'success') {
        enqueueSnackbar('Usuario criado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000,
        });
        navigate('/signin', { replace: true });
      } else {
        enqueueSnackbar(payload.menssage, {
          variant: 'success',
          autoHideDuration: 2000,
        });
      }
    },
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
      spacing={6}
      padding={2}
    >
      <Grid item>
        <Typography variant="h4" color="primary" gutterBottom>
          Cadastro de Colaborador
        </Typography>
      </Grid>
      <Grid item>
        <Paper elevation={3}>
          <Grid item xs={12}>
            <Grid container direction="column" padding={3} alignItems="center">
              <form onSubmit={formik.handleSubmit}>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Typography variant="body2" color="primary" gutterBottom>
                        Preencha os campos abaixo para cadastramento de usuario.
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
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
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
                        helperText={
                          formik.touched?.teamId && formik.errors.teamId
                        }
                      >
                        {teams?.map((teamItem) => (
                          <MenuItem key={teamItem.id} value={teamItem.id}>
                            <Typography variant="body2">
                              {teamItem.name}
                            </Typography>
                          </MenuItem>
                        ))}
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
                        helperText={
                          formik.touched.status && formik.errors.status
                        }
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
    </Grid>
  );
};

export default Signup;
