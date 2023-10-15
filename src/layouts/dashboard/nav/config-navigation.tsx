// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v4.2.0',
    items: [
      { title: 'One', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      { title: 'Two', path: PATH_DASHBOARD.two, icon: ICONS.ecommerce },
      { title: 'Library', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
    ],
  },
  // GROUP
  // ----------------------------------------------------------------------
  {
    subheader: 'groups',
    items: [
      { title: 'list of group', path: PATH_DASHBOARD.group.list, icon: ICONS.dashboard },
      { title: 'create', path: PATH_DASHBOARD.group.create, icon: ICONS.analytics },
    ],
  },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: PATH_DASHBOARD.user.four },
          { title: 'Five', path: PATH_DASHBOARD.user.five },
          { title: 'Six', path: PATH_DASHBOARD.user.six },
          { title: 'Account', path: PATH_DASHBOARD.user.myprofile },
        ],
      },
    ],
  },
];

const HomeNav = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Groups', path: PATH_DASHBOARD.two}
    ],
  },
  {
    items: [
      { title: 'Account', path: PATH_DASHBOARD.user.myprofile}
    ],
  },
];

export default HomeNav;
