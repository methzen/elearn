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

// const NavConfig = [
//   // GENERAL
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'general v4.2.0',
//     items: [
//       { title: 'Two', path: PATH_DASHBOARD.circles, icon: ICONS.ecommerce },
//     ],
//   },
//   // GROUP
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'groups',
//     items: [
//       { title: 'list of group', path: PATH_DASHBOARD.group.list, icon: ICONS.dashboard },
//       { title: 'create', path: PATH_DASHBOARD.group.create, icon: ICONS.analytics },
//     ],
//   },
//   // MANAGEMENT
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'management',
//     items: [
//       {
//         title: 'user',
//         path: PATH_DASHBOARD.user.root,
//         icon: ICONS.user,
//         children: [
//           { title: 'Four', path: PATH_DASHBOARD.user.four },
//           { title: 'Five', path: PATH_DASHBOARD.user.five },
//           { title: 'Six', path: PATH_DASHBOARD.user.six },
//           { title: 'Account', path: PATH_DASHBOARD.user.myprofile },
//         ],
//       },
//     ],
//   },
// ];

const GroupNav = (id:string)=> [
  {
    items: [
      {
        title: 'Circle',
        path: PATH_DASHBOARD.group.community(id),
        icon: ICONS.dashboard,
        children: [
          { title: 'Community', path: PATH_DASHBOARD.group.community(id)},
          { title: 'Library', path: PATH_DASHBOARD.group.library(id)},
          { title: 'Admin', path: PATH_DASHBOARD.group.admin(id)},
        ],
      },
      {
        title: 'Account',
        path: PATH_DASHBOARD.user.myprofile,
        icon: ICONS.user,
        children: [
          { title: 'user', path: PATH_DASHBOARD.user.myprofile}
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
      { title: 'Groups', path: PATH_DASHBOARD.circles}
    ],
  },
  {
    items: [
      { title: 'Account', path: PATH_DASHBOARD.user.myprofile}
    ],
  },
];

export {
  HomeNav,
  GroupNav,
}
