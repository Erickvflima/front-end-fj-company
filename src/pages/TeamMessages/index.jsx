import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';

const TeamMessages = () => {
  const [messageCount, setMessageCount] = useState(0);
  const [lastMessage, setLastMessage] = useState('');
  const [timeUntilNextMessage, setTimeUntilNextMessage] = useState(0);

  useEffect(() => {
    if (messageCount >= 4) {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeRemaining = tomorrow - now;

      setTimeUntilNextMessage(timeRemaining);
    }
  }, [messageCount]);

  const handleGetRandomMessage = () => {
    const newMessage = 'Mensagem aleatória gerada';
    setLastMessage(newMessage);
    setMessageCount(messageCount + 1);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Typography variant="h4" color="primary" gutterBottom>
          Mensagens da equipe
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" color="primary" paragraph>
          {`Colaborador, você pode acessar "Mensagens Aleatórias"`}
          {4 - messageCount} vezes hoje.
        </Typography>
        {timeUntilNextMessage > 0 ? (
          <Typography variant="body1" color="primary" paragraph>
            Você poderá acessar novamente em{' '}
            {Math.ceil(timeUntilNextMessage / (1000 * 60 * 60))} horas.
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleGetRandomMessage}
          >
            Obter Mensagem Aleatória
          </Button>
        )}
      </Grid>
      {lastMessage && (
        <Grid item>
          <Typography variant="body1" color="primary">
            Última mensagem: {lastMessage}
          </Typography>
        </Grid>
      )}
      {timeUntilNextMessage > 0 && (
        <Grid item>
          <div className="notification">
            <Typography variant="body1" color="error">
              Você atingiu o limite diário de mensagens aleatórias.
            </Typography>
            <Typography variant="body1" color="error">
              Tempo restante até a próxima mensagem:{' '}
              {Math.ceil(timeUntilNextMessage / (1000 * 60 * 60))} horas.
            </Typography>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default TeamMessages;
