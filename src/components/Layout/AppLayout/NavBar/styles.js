import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => {
  return {
    img: { width: '130px', marginLeft: '15px' },
    imgMenu: {
      display: 'flex',
      justifyContent: 'space-between !important',
    },
  };
});

export default useStyles;
