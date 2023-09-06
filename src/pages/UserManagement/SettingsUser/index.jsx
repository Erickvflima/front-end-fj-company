import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Modal,
  Divider,
} from '@mui/material';
import Label from '../../../components/Label';
import { customTextColor } from '../../../utils/colorText.js';
import { v4 as uuidv4 } from 'uuid';
import { changeMessage } from '../../../store/ducks/Message';
import { useDispatch } from 'react-redux';
import CustomBackDrop from '../../../components/CustomBackDrop';
import { useSnackbar } from 'notistack';
import { sendSignup } from '../../../store/ducks/User';
import { maskCpf } from '../../../utils/string/masks';

const SettingsUser = ({ data, open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  if (!data) {
    return null;
  }
  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  const initialValues = {
    nameTeam: data.nameTeam || null,
    statusTeam: data.statusTeam || null,
    id: data.id || 0,
    name: data.name || '',
    cpf: data.cpf || '',
    typeOfAccess: data.typeOfAccess || '',
    teamId: data.teamId || 0,
    status: data.status || '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (formik.values.id) {
        const {
          payload,
          meta: { requestStatus },
        } = await dispatch(changeMessage(values));
        setOpenBackdrop(true);
        if (requestStatus === 'fulfilled' && payload.status === 'success') {
          handleClose();
          enqueueSnackbar('Mensagem alterada com sucesso', {
            variant: 'success',
            autoHideDuration: 2000,
          });
          setOpenBackdrop(false);
        } else {
          setOpenBackdrop(false);
          enqueueSnackbar(payload.menssage, {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }
      } else {
        setOpenBackdrop(true);
        const {
          payload,
          meta: { requestStatus },
        } = await dispatch(sendSignup(values));
        if (requestStatus === 'fulfilled' && payload.status === 'success') {
          handleClose();
          enqueueSnackbar('Usuario criado com sucesso!', {
            variant: 'success',
            autoHideDuration: 2000,
          });
          formik.resetForm();
        } else {
          setOpenBackdrop(false);
          enqueueSnackbar(payload.message, {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }

        setOpenBackdrop(false);
      }
      setOpenBackdrop(false);
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-edit-title"
      aria-describedby="modal-edit-description"
      sx={{
        maxWidth: '405px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
    >
      <Grid container>
        <Grid item>
          <CustomBackDrop open={openBackdrop} />
          <Paper elevation={3}>
            <Grid container direction="column" padding={3} alignItems="center">
              <form onSubmit={formik.handleSubmit}>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item padding={2}>
                      <Typography variant="h4" color="primary">
                        Edição de mensagem
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
                        value={
                          formik.values.cpf
                            ? maskCpf(formik.values.cpf)
                            : formik.values.cpf
                        }
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
                        label="Status do Usuario"
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
                    {!formik.values.id && (
                      <>
                        <Grid item>
                          <TextField
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
                            fullWidth
                            id="statusTeam"
                            label="status da equipe"
                            name="statusTeam"
                            value={formik.values.statusTeam}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.statusTeam &&
                              Boolean(formik.errors.statusTeam)
                            }
                            helperText={
                              formik.touched.statusTeam &&
                              formik.errors.statusTeam
                            }
                            select
                          >
                            <MenuItem value="Ativo" key={uuidv4()}>
                              <Label color={customTextColor('Ativo')}>
                                ATIVO
                              </Label>
                            </MenuItem>
                            <MenuItem value="Inativo" key={uuidv4()}>
                              <Label color={customTextColor('Inativo')}>
                                INATIVO
                              </Label>
                            </MenuItem>
                          </TextField>
                        </Grid>
                      </>
                    )}
                    <Grid item>
                      <Grid container justifyContent="flex-end" spacing={2}>
                        <Grid item>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClose}
                            disabled={!formik.values.id}
                          >
                            cancelar
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
                            disabled={!formik.isValid}
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            {formik.values.id ? 'Alterar' : 'Criar'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default SettingsUser;
