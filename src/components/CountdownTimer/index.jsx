import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { formateDateNewDate } from '../../utils/conversorDate';

const CountdownTimer = () => {
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
    const now = formateDateNewDate(new Date());
    const referenceDate = `${now}T23:59:59`;

    const timeDiff = new Date(referenceDate) - new Date();

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
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
