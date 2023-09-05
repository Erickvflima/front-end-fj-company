import React, { useState } from 'react';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Divider,
} from '@mui/material';
import Label from '../../components/Label';
import { customTextColor } from '../../utils/colorText.js';
import { v4 as uuidv4 } from 'uuid';
import { maskCpf } from '../../utils/string/masks';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendSignup } from '../../store/ducks/User';
import CustomBackDrop from '../../components/CustomBackDrop';

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: null,
      cpf: null,
      typeOfAccess: 'Lider',
      status: 'Ativo',
      nameTeam: null,
      statusTeam: 'Ativo',
    },
    validationSchema,
    onSubmit: async (values) => {
      setOpenBackdrop(true);
      const {
        payload,
        meta: { requestStatus },
      } = await dispatch(sendSignup(values));
      if (requestStatus === 'fulfilled' && payload.status === 'success') {
        enqueueSnackbar('Usuario criado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000,
        });
        navigate('/userManagement', { replace: true });
        formik.resetForm();
      } else {
        enqueueSnackbar(payload.menssage, {
          variant: 'success',
          autoHideDuration: 2000,
        });
      }
      setOpenBackdrop(false);
    },
  });

  return (
    <Grid
      container
      j
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
      spacing={6}
      padding={2}
    >
      <Grid item>
        <Typography variant="h4" color="primary" gutterBottom>
          Cadastro de Lideres
        </Typography>
      </Grid>
      <Grid item>
        <Paper elevation={3}>
          <CustomBackDrop open={openBackdrop} />
          <Grid item xs={12}>
            <Grid
              container
              direction="column"
              padding={3}
              minWidth="400px"
              alignItems="center"
            >
              <form onSubmit={formik.handleSubmit}>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    minWidth="400px"
                  >
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
                        label="Nome do usuario"
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
                        <MenuItem value="Lider" key={uuidv4()}>
                          <Label color={customTextColor('Lider')}>Lider</Label>
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
                        helperText={
                          formik.touched.status && formik.errors.status
                        }
                        select
                      >
                        <MenuItem value="Ativo" key={uuidv4()}>
                          <Label color={customTextColor('Ativo')}>ATIVO</Label>
                        </MenuItem>
                        <MenuItem value="Inativo" key={uuidv4()}>
                          <Label color={customTextColor('Inativo')}>
                            INATIVO
                          </Label>
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <TextField
                        required
                        fullWidth
                        id="nameTeam"
                        label="Nome da Equipe"
                        name="nameTeam"
                        value={formik.values.nameTeam}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.nameTeam &&
                          Boolean(formik.errors.nameTeam)
                        }
                        helperText={
                          formik.touched.nameTeam && formik.errors.nameTeam
                        }
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        required
                        fullWidth
                        id="statusTeam"
                        label="Status da Equipe"
                        name="statusTeam"
                        value={formik.values.statusTeam}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.statusTeam &&
                          Boolean(formik.errors.statusTeam)
                        }
                        helperText={
                          formik.touched.statusTeam && formik.errors.statusTeam
                        }
                        select
                      >
                        <MenuItem value="Ativo" key={uuidv4()}>
                          <Label color={customTextColor('Ativo')}>ATIVO</Label>
                        </MenuItem>
                        <MenuItem value="Inativo" key={uuidv4()}>
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
                        disabled={!formik.values.name || !formik.isValid}
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Cadastrar
                      </Button>
                    </Grid>
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

export default UserManagement;
