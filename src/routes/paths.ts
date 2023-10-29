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
  circles: path(ROOTS_DASHBOARD, '/circles'),
  group: {
    list : (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/list`),
    create : (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/create`),
    library: (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/library`),
    community: (id: String) =>  path(ROOTS_DASHBOARD, `/${id}/community`),
  },
  user: {
    myprofile: path(ROOTS_DASHBOARD, `/user/myprofile`),
    // profile: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/profile`),
  },
};
