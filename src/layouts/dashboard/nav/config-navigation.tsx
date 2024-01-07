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

const GroupNav = (id:string, isAdmin:boolean)=> {
  const circleChildren = [
    { title: 'Community', path: PATH_DASHBOARD.group.community(id)},
    { title: 'Library', path: PATH_DASHBOARD.group.library(id)},
  ]
  
  if(isAdmin){
    circleChildren.push({ title: 'Admin', path: PATH_DASHBOARD.group.admin(id)})
  }
  return [
  {
    items: [
      {
        title: 'Circle',
        path: PATH_DASHBOARD.group.community(id),
        icon: ICONS.dashboard,
        children: circleChildren,
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
]};

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
