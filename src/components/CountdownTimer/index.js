import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDateTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calculateTimeRemaining() {
    const now = new Date();
    const targetDate = new Date(targetDateTime);

    if (targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const timeDiff = targetDate - now;
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid item>
        <Typography variant="body1">
          Proxima menssagem disponivel em:
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="primary">
          {timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}s
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CountdownTimer;
