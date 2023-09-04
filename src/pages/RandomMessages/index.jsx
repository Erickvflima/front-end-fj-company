import React, { useState, useEffect } from 'react';
import { Button, Grid, Snackbar, Typography } from '@mui/material';

const RandomMessages = () => {
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const maxDailyAccess = 4;
  const accessInterval = (24 * 60 * 60 * 1000) / maxDailyAccess;

  const fetchRandomMessage = () => {
    fetch('https://api.adviceslip.com/advice')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.slip.advice);
        setMessageHistory((prevHistory) => [data.slip.advice, ...prevHistory]);
      })
      .catch((error) => {
        console.error('Erro ao buscar mensagem aleatória:', error);
      });
  };

  const handleRandomMessageClick = () => {
    if (messageHistory.length >= maxDailyAccess) {
      const nextAccessTime = new Date(
        messageHistory[messageHistory.length - maxDailyAccess] + accessInterval,
      );
      const currentTime = new Date();
      const remainingTime = new Date(nextAccessTime - currentTime);
      const hours = remainingTime.getUTCHours();
      const minutes = remainingTime.getUTCMinutes();
      const seconds = remainingTime.getUTCSeconds();
      setSnackbarMessage(
        `Você atingiu o limite de mensagens diárias. Tempo restante para a próxima mensagem: ${hours}h ${minutes}m ${seconds}s`,
      );
      setOpenSnackbar(true);
    } else {
      fetchRandomMessage();
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const resetMessageHistory = () => {
      setMessageHistory([]);
    };

    const intervalId = setInterval(resetMessageHistory, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Grid>
      <Typography variant="h5" gutterBottom>
        Mensagens Aleatórias
      </Typography>
      <Button variant="contained" onClick={handleRandomMessageClick}>
        Obter Mensagem Aleatória
      </Button>

      <Typography variant="body1" style={{ marginTop: '16px' }}>
        {message}
      </Typography>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Grid>
  );
};

export default RandomMessages;
