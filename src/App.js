import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Navigate, Route, Routes } from 'react-router-dom';
import ptBr from 'dayjs/locale/pt-br';
import theme from './styles/theme/light';
// import FakePage from './pages/FakePage';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import routes from './routes';
// import FakePage from 'pages/FakePage';
// import routes from 'routes';
// import { useAppSelector } from 'hooks/useAppStore';
// import Layout from 'components/Layout';

const App = () => {
  // const navigate = useNavigate();
  // const signedRedux = useAppSelector((state) => {
  //   return state.signer.signed;
  // });
  const signedRedux = true;

  // useEffect(() => {
  //   if (
  //     !signedRedux &&
  //     !window.location.pathname.includes('recoverypassword')
  //   ) {
  //     navigate('/signin');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [signedRedux, window.location.pathname]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBr.name}>
      <ThemeProvider theme={theme}>
        <Routes>
          {routes.map(({ isPrivate, component: Component, path }) => {
            if (!isPrivate) {
              return <Route path={path} element={Component} key={path} />;
            }
            return false;
          })}
          <Route path="*" element={<Dashboard />} />
          {signedRedux ? (
            <Route path="/*" element={<Layout />} />
          ) : (
            <Route element={<Navigate to="/signin" />} />
          )}
        </Routes>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
