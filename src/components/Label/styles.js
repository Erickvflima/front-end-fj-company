import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

const useStyles = makeStyles((theme) => {
  return {
    primary: {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
      display: 'inline-block',
    },
    secondary: {
      color: theme.palette.secondary.main,
      backgroundColor: alpha(theme.palette.secondary.main, 0.25),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
      display: 'inline-block',
    },
    error: {
      color: theme.palette.error.main,
      backgroundColor: alpha(theme.palette.error.main, 0.25),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
      display: 'inline-block',
    },
    success: {
      color: theme.palette.success.main,
      backgroundColor: alpha(theme.palette.success.main, 0.25),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
      display: 'inline-block',
    },
    warning: {
      color: theme.palette.warning.main,
      backgroundColor: alpha(theme.palette.warning.main, 0.25),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
      display: 'inline-block',
    },
    info: {
      color: theme.palette.info.main,
      backgroundColor: alpha(theme.palette.info.main, 0.25),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
      display: 'inline-block',
    },
    draft: {
      color: theme.palette.grey[600],
      backgroundColor: alpha(theme.palette.grey[600], 0.25),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
      display: 'inline-block',
    },
    approved: {
      color: '#00d631',
      display: 'inline-block',
      backgroundColor: alpha(theme.palette.grey[900], 0.13),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
    },

    waitApproved: {
      color: '#b5972b',
      display: 'inline-block',
      backgroundColor: alpha(theme.palette.grey[900], 0.11),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
    },
    disapproved: {
      color: '#ff0000',
      display: 'inline-block',
      backgroundColor: alpha(theme.palette.grey[900], 0.8),
      padding: '2px 8px 2px 8px',
      borderRadius: '8px',
    },
  };
});

export default useStyles;
