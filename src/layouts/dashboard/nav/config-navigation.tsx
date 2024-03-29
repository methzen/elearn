// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { NavListProps } from 'src/components/nav-section';
import GroupsIcon from '@mui/icons-material/Groups';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const GroupNav = (id: string, isAdmin: boolean, groupName: string, pathnameCreate = false) => {
  const defaultItems: NavListProps[] = [
    {
      title: 'My Circles',
      path: PATH_DASHBOARD.circles,
      icon: <GroupsIcon />,
    },
    // {
    //   title: 'chat',
    //   path: PATH_DASHBOARD.chat.root,
    //   icon: ICONS.chat,
    // },
    {
      title: 'My Account',
      path: PATH_DASHBOARD.user.myprofile,
      icon: ICONS.user,
    },
  ];
  if (pathnameCreate) {
    defaultItems.unshift({
      title: 'Create Circle',
      path: PATH_DASHBOARD.create,
      icon: ICONS.dashboard,
    });
  }
  if (id) {
    const circleChildren = [
      { title: 'Community', path: PATH_DASHBOARD.group.community(id) },
      { title: 'Library', path: PATH_DASHBOARD.group.library(id) },
    ];
    if (isAdmin) {
      circleChildren.push({ title: 'Admin', path: PATH_DASHBOARD.group.admin(id) });
    }
    if (groupName) {
      defaultItems.unshift({
        title: groupName.charAt(0) + groupName.slice(1),
        path: PATH_DASHBOARD.group.community(id),
        icon: <GroupsIcon />,
        children: circleChildren,
      });
    }
  }
  return [
    {
      items: defaultItems,
    },
  ];
};

export { GroupNav };
