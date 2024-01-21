// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Pricing',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.components,
  },
  {
    title: 'Login',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.components,
  },
];

export default navConfig;
