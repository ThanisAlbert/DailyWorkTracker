import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from './layouts/dashboard/layout';
import IconsPage from './pages/icons';
import NotFoundPage from './pages/404';
import OrdersPage from './pages/orders';
import ReportsPage from './pages';
import SettingsPage from './pages/settings';
import ThemePage from './pages/theme';
import workformPage from './pages';
import Workform from './pages/Workform';
import EditWorkItemPage from './pages/EditWorkItemPage';

export const routes = [
  {
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      { 
        index: true,       
        element: <Workform />
      },
      {        
        path: '/edit/:id',
        element: <EditWorkItemPage />
      },


      {        
        path: 'orders',
        element: <OrdersPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'theme',
        element: <ThemePage />
      },
      {
        path: 'icons',
        element: <IconsPage />
      }
    ]
  },


  {
    path: '/newtest',
    element: (
      <DashboardLayout>
          <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <div>Helloworld</div>
      }  
    ]
  },


  {
    path: '/test',
    element: <div>Helloworld2 !!</div>
  },
 
];
