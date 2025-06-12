import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';

const Dashboard = lazy(() => import('../pages/home/home'));
const Login = lazy(() => import('../pages/auth/login/login'));
const History = lazy(() => import('../pages/history/history'));
const Help = lazy(() => import('../pages/help/help'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>,
      },
      {
        path: 'history',
        element: <Suspense fallback={<div>Loading...</div>}><History /></Suspense>,
      },
      {
        path: 'help',
        element: <Suspense fallback={<div>Loading...</div>}><Help /></Suspense>,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
