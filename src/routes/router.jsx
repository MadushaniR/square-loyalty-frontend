import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';

const Dashboard = lazy(() => import('../pages/home/home'));
const Login = lazy(() => import('../pages/auth/login/login'));
const Register = lazy(() => import('../pages/auth/register/register'));
const History = lazy(() => import('../pages/history/history'));
const Points = lazy(() => import('../pages/points/points'));


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
     children: [
      { path: '', element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense> },
      { path: 'history', element: <Suspense fallback={<div>Loading...</div>}><History /></Suspense> },
      { path: 'points', element: <Suspense fallback={<div>Loading...</div>}><Points /></Suspense> },
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
