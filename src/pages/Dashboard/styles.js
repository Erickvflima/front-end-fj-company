import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  return {
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
    },
    colorTextContractAndRevenues: {
      color: theme.palette.primary.main,
      fontSize: '2rem',
    },
    alignLabelContractAndRevenues: {
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    alignItemContractAndRevenues: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    textLabelContractAndRevenues: {
      margin: '0',
      color: '#666',
    },
    paperChart: {
      padding: '3px 5px 5px 3px ',
      borderLeft: '5px solid #005882',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    styleIcon: { fontSize: '300%' },
    circularIcon: {
      border: `2px solid ${theme.palette.primary.main}`,
      padding: '3px',
    },
    marginItems: { margin: '10px 0 10px 0' },
  };
});

export default useStyles;
