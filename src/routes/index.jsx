/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, lazy } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';

const Loader = (Component) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    return (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

const Layout = Loader(
  lazy(() => {
    return import('../components/Layout');
  }),
);

const RandomMessages = Loader(
  lazy(() => {
    return import('../pages/RandomMessages');
  }),
);
const MessageRegistration = Loader(
  lazy(() => {
    return import('../pages/MessageRegistration');
  }),
);
const TeamMessages = Loader(
  lazy(() => {
    return import('../pages/TeamMessages');
  }),
);
const UserManagement = Loader(
  lazy(() => {
    return import('../pages/UserManagement');
  }),
);

const Signin = Loader(
  lazy(() => {
    return import('../pages/Signin');
  }),
);

const routes = [
  {
    path: '/*',
    title: 'Layout',
    component: <Layout />,
    isPrivate: false,
  },

  {
    path: '/RandomMessages',
    title: 'Mensagem Aleatorias',
    component: <RandomMessages />,
    isPrivate: true,
  },
  {
    path: '/teamMessages',
    title: 'Mensagens da Equipe',
    component: <TeamMessages />,
    isPrivate: true,
  },
  {
    path: '/messageRegistration',
    title: 'Cadastro de Mensagens',
    component: <MessageRegistration />,
    isPrivate: true,
  },
  {
    path: '/userManagement',
    title: 'Usuários',
    component: <UserManagement />,
    isPrivate: true,
  },

  {
    path: '/signin',
    title: 'Signin',
    component: <Signin />,
    isPrivate: false,
  },
];

export default routes;
