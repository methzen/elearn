// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  circles: path(ROOTS_DASHBOARD, '/circles'),
  group: {
    admin : (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/admin`),
    library: (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/library`),
    community: (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/community`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, `/user`),
    myprofile: path(ROOTS_DASHBOARD, `/user/myprofile`),
  },
};
