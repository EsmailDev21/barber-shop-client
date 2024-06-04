import { lazy, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate } from 'react-router-dom';
import RequireRole from 'src/hoc/RequireRole';

import DashboardLayout from 'src/layouts/dashboard';
import RegisterPage from 'src/pages/register';
import IndexPage from 'src/pages/app';
import BlogPage from 'src/pages/blog';
import UserPage from 'src/pages/user';
import LoginPage from 'src/pages/login';
import ServicesPage from 'src/pages/services-page';
import Page404 from 'src/pages/page-not-found';
import ProfilePage from 'src/pages/profile';
import NotAuthorizedPage from 'src/pages/not-authorized-page';
import NotAuthenticatedPage from 'src/pages/not-authenticated-page';
import UploadProfilePhotoPage from 'src/pages/upload-profile-photo';
import Suspense from 'src/hoc/Suspense';
import FetchUser from 'src/hoc/FetchUser';
import ErrorPage from 'src/pages/error-page';
import ServicePage from 'src/pages/service-page';
import FetchUsers from 'src/hoc/FetchUsers';
import useAuth from 'src/hooks/use-auth';
import BarbersPage from 'src/pages/barbers';
import FetchServices from 'src/hoc/FetchServices';
import AddServicePage from 'src/pages/add-service';
import CheckUserStatus from 'src/hoc/CheckUserStatus';
import FetchReviews from 'src/hoc/FetchReviews';
import BookingsPage from 'src/pages/bookings';
import FetchBookings from 'src/hoc/FetchBookings';
import FetchAnalytics from 'src/hoc/FetchAnalytics';

// ----------------------------------------------------------------------

const InitialPath = () => {
  const { isExpired, authToken } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (authToken && isExpired === false) {
      navigate('/services');
    } else {
      navigate('/login');
    }
  });
  return null;
};
export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <FetchUser>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </FetchUser>
      ),
      children: [
        {
          path: 'dashboard',
          element: (
            <CheckUserStatus>
              <RequireRole role={['ADMIN', 'BARBER']}>
                <IndexPage />
              </RequireRole>
            </CheckUserStatus>
          ),
        },
        {
          path: 'user',
          element: (
            <CheckUserStatus>
              <FetchUsers>
                <RequireRole role={['ADMIN', 'BARBER']}>
                  <UserPage />
                </RequireRole>
              </FetchUsers>
            </CheckUserStatus>
          ),
        },
        {
          path: 'barbers',
          element: (
            <CheckUserStatus>
              <FetchUsers>
                <BarbersPage />
              </FetchUsers>
            </CheckUserStatus>
          ),
        },
        {
          path: 'profile',
          element: (
            <CheckUserStatus>
              <RequireRole role={['CUSTOMER', 'BARBER', 'ADMIN']}>
                <ProfilePage />
              </RequireRole>
            </CheckUserStatus>
          ),
        },
        {
          path: 'services',
          element: (
            <CheckUserStatus>
              <FetchServices>
                <ServicesPage />
              </FetchServices>
            </CheckUserStatus>
          ),
          children: [],
        },
        {
          path: 'services/:id',
          element: (
            <CheckUserStatus>
              <RequireRole role={['CUSTOMER', 'BARBER', 'ADMIN']}>
                <FetchUsers>
                  <FetchReviews>
                    <ServicePage />
                  </FetchReviews>
                </FetchUsers>
              </RequireRole>
            </CheckUserStatus>
          ),
        },
        {
          path: 'bookings',
          element: (
            <CheckUserStatus>
              <RequireRole role={['CUSTOMER', 'BARBER', 'ADMIN']}>
                <FetchUsers>
                  <FetchServices>
                    <FetchBookings>
                      <BookingsPage />
                    </FetchBookings>
                  </FetchServices>
                </FetchUsers>
              </RequireRole>
            </CheckUserStatus>
          ),
        },
        {
          path: 'services/new',
          element: (
            <CheckUserStatus>
              <RequireRole role={['BARBER']}>
                <AddServicePage />
              </RequireRole>
            </CheckUserStatus>
          ),
        },
        // { path: 'blog', element: <BlogPage /> },
        {
          path: 'upload-profile-photo',
          element: (
            <CheckUserStatus>
              <RequireRole role={['CUSTOMER', 'BARBER', 'ADMIN']}>
                <UploadProfilePhotoPage />
              </RequireRole>
            </CheckUserStatus>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <InitialPath />,
    },

    {
      path: 'register',
      element: <RegisterPage />,
    },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'not-authorized',
      element: <NotAuthorizedPage />,
    },
    {
      path: 'not-authenticated',
      element: <NotAuthenticatedPage />,
    },
    {
      path: 'error',
      element: <ErrorPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
