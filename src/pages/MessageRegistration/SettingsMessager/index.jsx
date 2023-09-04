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
  Modal,
} from '@mui/material';
import Label from '../../../components/Label';
import { customTextColor } from '../../../utils/colorText.js';
import {
  changeMessage,
  deleteMessageById,
  newMessage,
} from '../../../store/ducks/Message';
import { useDispatch } from 'react-redux';
import CustomBackDrop from '../../../components/CustomBackDrop';
import { useSnackbar } from 'notistack';

const SettingsMessager = ({ messageDocument, open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  if (!messageDocument) {
    return null;
  }

  const formik = useFormik({
    initialValues: {
      id: messageDocument.id,
      description: messageDocument.description || '',
      teamId: messageDocument.teamId,
      status: messageDocument?.status || '',
    },
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
          enqueueSnackbar('Erro ao alterar mensagem.', {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }
      } else {
        const {
          payload,
          meta: { requestStatus },
        } = await dispatch(newMessage(values));
        setOpenBackdrop(true);
        if (requestStatus === 'fulfilled' && payload.status === 'success') {
          handleClose();
          enqueueSnackbar('Mensagem alterada com sucesso', {
            variant: 'success',
            autoHideDuration: 2000,
          });
          setOpenBackdrop(false);
        } else {
          enqueueSnackbar('Erro ao alterar mensagem.', {
            variant: 'error',
            autoHideDuration: 2000,
          });
        }
      }
    },
  });

  const handleDelete = async () => {
    const {
      payload,
      meta: { requestStatus },
    } = await dispatch(deleteMessageById({ id: formik.values.id }));
    setOpenBackdrop(true);
    if (requestStatus === 'fulfilled' && payload.status === 'success') {
      handleClose();
      enqueueSnackbar('Mensagem deletada com sucesso', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      setOpenBackdrop(false);
    } else {
      enqueueSnackbar('Erro ao deletar mensagem.', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-edit-title"
      aria-describedby="modal-edit-description"
    >
      <Grid container justifyContent="center" alignItems="center" margin={2}>
        <CustomBackDrop open={openBackdrop} />
        <Paper elevation={3}>
          <Grid item xs={12}>
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
                        id="description"
                        label="Descrição"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.description &&
                          Boolean(formik.errors.description)
                        }
                        helperText={
                          formik.touched.description &&
                          formik.errors.description
                        }
                      />
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
                      <Grid container justifyContent="flex-end" spacing={2}>
                        <Grid item>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleDelete}
                          >
                            excluir
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            {formik.values.id ? 'Alterar' : 'Inserir'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Modal>
  );
};

export default SettingsMessager;
