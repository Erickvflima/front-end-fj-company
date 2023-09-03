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

const Home = Loader(
  lazy(() => {
    return import('../pages/Home');
  }),
);
const Dashboard = Loader(
  lazy(() => {
    return import('../pages/Dashboard');
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
    path: '/home',
    title: 'Home',
    component: <Home />,
    isPrivate: false,
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: <Dashboard />,
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
