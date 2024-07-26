import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    permissions: ['ADMIN', 'BARBER'],
    icon: icon('analytics1'),
  },
  {
    title: 'Users',
    permissions: ['ADMIN', 'BARBER'],
    path: '/user',
    icon: icon('users1'),
  },
  {
    title: 'Services',
    permissions: ['ADMIN', 'BARBER', 'CUSTOMER'],
    path: '/services',
    icon: icon('services1'),
  },
  {
    title: 'Barbers',
    permissions: ['ADMIN', 'BARBER', 'CUSTOMER'],
    path: '/barbers',
    icon: icon('barbers1'),
  },
  {
    title: 'Profile',
    path: '/profile',
    permissions: ['ADMIN', 'BARBER', 'CUSTOMER'],
    icon: icon('profile1'),
  },
  {
    title: 'Bookings',
    path: '/bookings',
    permissions: ['ADMIN', 'BARBER', 'CUSTOMER'],
    icon: icon('bookings'),
  },
  {
    title: 'My Services',
    path: '/my-services',
    permissions: ['BARBER'],
    icon: icon('services1'),
  },
  /* {
    title: 'New Service',
    path: '/services/new',
    permissions: ['ADMIN', 'BARBER', 'CUSTOMER'],
    icon: icon('ic_user'),
  },*/
];

export default navConfig;
