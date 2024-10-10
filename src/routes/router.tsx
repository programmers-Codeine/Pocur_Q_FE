import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '@/pages/Error';
import { LoginPage, RegisterPage } from '@/pages/AdminHome';
import { MenuPage, DesignPage, EtcPage } from '@/pages/Setting';
import { RealTimeMenuPage, StatisticsPage, TablePage } from '@/pages/Manage';
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
  ROUTE_CUSTOMER_HOME,
  ROUTE_CUSTOMER_MENU,
  ROUTE_CUSTOMER_DETAIL_MENU,
  ROUTE_CUSTOMER_FAST_TOOL,
  ROUTE_CUSTOMER_CART,
  ROUTE_CUSTOMER_ORDER,
  ROUTE_CUSTOMER_ORDER_SUCCESS,
} from '@/constants/routing';
import {
  AdminHomeLayout,
  AdminLayout,
  ManageLayout,
  SettingLayout,
  CustomerLayout,
} from '@/components/common/Layout';
import {
  CustomerCartPage,
  CustomerDetailMenuPage,
  CustomerFastToolPage,
  CustomerHomePage,
  CustomerMenuPage,
  CustomerOrderPage,
  CustomerOrderSuccessPage,
} from '@/pages/Customer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminHomeLayout />,
    children: [
      { path: ROUTE_LOGIN, element: <LoginPage /> },
      { path: ROUTE_REGISTER, element: <RegisterPage /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: `/${ROUTE_ADMIN}`,
    element: <AdminLayout />,
    children: [
      {
        path: ROUTE_MANAGE,
        element: <ManageLayout />,
        children: [
          { path: ROUTE_TABLE, element: <TablePage /> },
          { path: ROUTE_REAL_TIME_MENU, element: <RealTimeMenuPage /> },
          { path: ROUTE_STATISTICS, element: <StatisticsPage /> },
        ],
      },
      {
        path: ROUTE_SETTING,
        element: <SettingLayout />,
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
    element: <CustomerLayout />,
    children: [
      { path: ROUTE_CUSTOMER_HOME, element: <CustomerHomePage /> },
      { path: ROUTE_CUSTOMER_MENU, element: <CustomerMenuPage /> },
      { path: ROUTE_CUSTOMER_DETAIL_MENU, element: <CustomerDetailMenuPage /> },
      { path: ROUTE_CUSTOMER_FAST_TOOL, element: <CustomerFastToolPage /> },
      { path: ROUTE_CUSTOMER_CART, element: <CustomerCartPage /> },
      { path: ROUTE_CUSTOMER_ORDER, element: <CustomerOrderPage /> },
      { path: ROUTE_CUSTOMER_ORDER_SUCCESS, element: <CustomerOrderSuccessPage /> },
    ],
  },
]);
