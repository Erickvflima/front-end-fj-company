import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  return {
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
    },
  };
});

export default useStyles;
