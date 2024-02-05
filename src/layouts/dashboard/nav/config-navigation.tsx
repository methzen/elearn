// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { NavListProps } from 'src/components/nav-section';

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

const GroupNav = (id:string, isAdmin:boolean, groupName: string, pathnameCreate=false) => {

  const defaultItems:NavListProps[] = [
    { 
      title: 'My Circles', 
      path: PATH_DASHBOARD.circles,
      icon: ICONS.dashboard,
    },
    {
      title: 'My Account',
      path: PATH_DASHBOARD.user.myprofile,
      icon: ICONS.user,
    },
  ]
  if(pathnameCreate){
    defaultItems.unshift({ 
      title: 'Create Circle', 
      path: PATH_DASHBOARD.create,
      icon: ICONS.dashboard,
    })
  }
  if(id){
    const circleChildren = [
      { title: 'Community', path: PATH_DASHBOARD.group.community(id)},
      { title: 'Library', path: PATH_DASHBOARD.group.library(id)},
    ]
    if(isAdmin){
      circleChildren.push({ title: 'Admin', path: PATH_DASHBOARD.group.admin(id)})
    }
    if(groupName){
      defaultItems.unshift({
        title: groupName.charAt(0)+groupName.slice(1),
        path: PATH_DASHBOARD.group.community(id),
        icon: ICONS.dashboard,
        children: circleChildren,
      })
    }
  }
  return [
  {
    items: defaultItems
  },
]};

export {
  GroupNav,
}
