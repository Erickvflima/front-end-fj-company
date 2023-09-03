import React, { useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ptBr from 'dayjs/locale/pt-br';
import theme from './styles/theme/light';
import FakePage from './pages/FakePage';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import routes from './routes';

const App = () => {
  const navigate = useNavigate();

  const signedRedux = useSelector((state) => {
    return state.user.signed;
  });

  useEffect(() => {
    if (!signedRedux) {
      navigate('/signin');
    }
  }, [signedRedux]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBr.name}>
      <ThemeProvider theme={theme}>
        <Routes>
          {routes.map(({ isPrivate, component: Component, path }) => {
            // eslint-disable-next-line no-undef
            console.log(isPrivate, Component, path);
            if (!isPrivate) {
              return <Route path={path} element={Component} key={path} />;
            }
            return false;
          })}
          <Route path="*" element={<FakePage />} />
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
