import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/common/Layout/Layout';
import AdminHome from '@/components/common/Layout/AdminHome';
import { ErrorPage } from '@/pages/Error';
import { LoginPage } from '@/pages/Login';
import { SettingPage, MenuPage, DesignPage, EtcPage } from '@/pages/Setting';
import { ManagePage, RealTimeMenuPage, StatisticsPage, TablePage } from '@/pages/Manage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminHome />,
    children: [{ path: 'login', element: <LoginPage /> }],
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin',
    element: <Layout />,
    children: [
      {
        path: 'manage',
        element: <ManagePage />,
        children: [
          { path: 'table', element: <TablePage /> },
          { path: 'real-time-menu', element: <RealTimeMenuPage /> },
          { path: 'statistics', element: <StatisticsPage /> },
        ],
      },
      {
        path: 'setting',
        element: <SettingPage />,
        children: [
          { path: 'menu', element: <MenuPage /> },
          { path: 'design', element: <DesignPage /> },
          { path: 'etc', element: <EtcPage /> },
        ],
      },
    ],
  },
  {
    path: '/customer',
    element: <Layout />,
  },
]);
