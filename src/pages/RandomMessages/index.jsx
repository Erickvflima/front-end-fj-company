import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { randomMessage } from '../../store/ducks/Message';
import { useSnackbar } from 'notistack';
import CustomBackDrop from '../../components/CustomBackDrop';
import CountdownTimer from '../../components/CountdownTimer';
import { useDispatch, useSelector } from 'react-redux';

const RandomMessages = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    user: { sendSignin },
  } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const showMessage = true;

  useEffect(() => {
    (async () => {
      setOpenBackdrop(true);
      const {
        payload,
        meta: { requestStatus },
      } = await dispatch(randomMessage({ id: sendSignin.document.id }));
      if (requestStatus === 'fulfilled' && payload.status === 'success') {
        setOpenBackdrop(false);
        setCurrentMessage(payload.message);
      } else {
        enqueueSnackbar('Erro ao buscar menssage', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
      setOpenBackdrop(false);
    })();
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
      spacing={6}
    >
      <Grid item>
        <Typography variant="h4" color="primary" gutterBottom>
          Mensagen da sorte
        </Typography>
      </Grid>
      <Grid item>
        <Paper elevation={3}>
          <CustomBackDrop open={openBackdrop} />
          <Grid item xs={12}>
            <Grid container direction="column" padding={3} alignItems="center">
              <Grid item>
                <Grid
                  container
                  direction="column"
                  padding={3}
                  alignItems="center"
                  spacing={2}
                >
                  {showMessage ? (
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        sx={{ maxWidth: '500px' }}
                        spacing={2}
                      >
                        <Grid item>
                          <Typography variant="h6" color="primary">
                            {currentMessage}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" color="primary">
                            {currentMessage}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography variant="h5" color="primary">
                          Limite de mensagens atingida!
                        </Typography>
                      </Grid>
                      <Grid item>
                        <CountdownTimer targetDateTime={new Date()} />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RandomMessages;
