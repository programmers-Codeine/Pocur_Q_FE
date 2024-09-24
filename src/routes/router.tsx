import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/common/Layout/Layout';
import AdminHome from '@/components/common/Layout/AdminHome';
import { ErrorPage } from '@/pages/Error';
import { LoginPage, RegisterPage } from '@/pages/AdminHome';
import { SettingPage, MenuPage, DesignPage, EtcPage } from '@/pages/Setting';
import { ManagePage, RealTimeMenuPage, StatisticsPage, TablePage } from '@/pages/Manage';
import {
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_ADMIN,
  ROUTE_MANAGE,
  ROUTE_TABLE,
  ROUTE_REAL_TIME_MENU,
  ROUTE_STATISTICS,
  ROUTE_SETTING,
  ROUTE_MENU,
  ROUTE_DESIGN,
  ROUTE_ETC,
  ROUTE_CUSTOMER,
} from '@/constants/routing';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminHome />,
    children: [
      { path: ROUTE_LOGIN, element: <LoginPage /> },
      { path: ROUTE_REGISTER, element: <RegisterPage /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: `/${ROUTE_ADMIN}`,
    element: <Layout />,
    children: [
      {
        path: ROUTE_MANAGE,
        element: <ManagePage />,
        children: [
          { path: ROUTE_TABLE, element: <TablePage /> },
          { path: ROUTE_REAL_TIME_MENU, element: <RealTimeMenuPage /> },
          { path: ROUTE_STATISTICS, element: <StatisticsPage /> },
        ],
      },
      {
        path: ROUTE_SETTING,
        element: <SettingPage />,
        children: [
          { path: ROUTE_MENU, element: <MenuPage /> },
          { path: ROUTE_DESIGN, element: <DesignPage /> },
          { path: ROUTE_ETC, element: <EtcPage /> },
        ],
      },
    ],
  },
  {
    path: `/${ROUTE_CUSTOMER}`,
    element: <Layout />,
  },
]);
