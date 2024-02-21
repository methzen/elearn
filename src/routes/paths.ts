// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
  register: '/register',
  verify: '/verify',
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
  create: path(ROOTS_DASHBOARD, `/create`),
  group: {
    admin : (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/admin`),
    library: (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/library`),
    community: (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/community`),
    createCourse: (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/create`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, `/user`),
    myprofile: path(ROOTS_DASHBOARD, `/user/myprofile`),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
};
