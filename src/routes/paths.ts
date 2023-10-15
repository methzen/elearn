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

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  one: path(ROOTS_DASHBOARD, '/one'),
  circles: path(ROOTS_DASHBOARD, '/circles'),
  library: path(ROOTS_DASHBOARD, '/library'),
  community: path(ROOTS_DASHBOARD, '/community'),
  group: {
    list : path(ROOTS_DASHBOARD, '/group/list'),
    create : path(ROOTS_DASHBOARD, '/group/create'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
    myprofile: path(ROOTS_DASHBOARD, `/user/myprofile`),
    // profile: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/profile`),
  },
};
