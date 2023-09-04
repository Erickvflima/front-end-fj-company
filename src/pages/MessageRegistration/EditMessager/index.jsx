import React from 'react';
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

const EditMessager = ({ messageDocument, open, handleClose }) => {
  if (!messageDocument) {
    return null;
  }

  const formik = useFormik({
    initialValues: {
      description: messageDocument.description,
      teamId: messageDocument.teamId,
      status: messageDocument?.status,
    },
    validationSchema,
    onSubmit: async (values) => {
      // eslint-disable-next-line no-undef
      console.log(values);
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-edit-title"
      aria-describedby="modal-edit-description"
    >
      <Grid container justifyContent="center" alignItems="center" margin={2}>
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
                            Alterar
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

export default EditMessager;
