import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';

const Dashboard = lazy(() => import('../pages/home/home'));
const Login = lazy(() => import('../pages/auth/login/login'));
const Register = lazy(() => import('../pages/auth/register/register'));
// const Profile = lazy(() => import('./pages/Profile'));
// const Settings = lazy(() => import('./pages/Settings'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense> },
    //   { path: 'profile', element: <Suspense fallback={<div>Loading...</div>}><Profile /></Suspense> },
    //   { path: 'settings', element: <Suspense fallback={<div>Loading...</div>}><Settings /></Suspense> },
    ],
  }, {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
