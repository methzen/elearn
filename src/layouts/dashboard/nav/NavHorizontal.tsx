import { memo, useContext } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, BoxProps, Toolbar } from '@mui/material';
// config
import { HEADER } from '../../../config-global';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
//
import {GroupNav} from './config-navigation';
import { useRouter } from 'next/router'
import { CircleAccessRoleContext, RoleType } from 'src/auth/CircleAccessGuard';
import { PATH_DASHBOARD } from 'src/routes/paths';
// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();
  const {
    pathname,
    query: { circleId },
  } = useRouter();

  const context = useContext(CircleAccessRoleContext)
  const isAdmin = context?.role === RoleType.admin
  const NavConfig = GroupNav(circleId as string, isAdmin as boolean, context?.name as string, pathname===PATH_DASHBOARD.create)

  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
        top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal data={NavConfig} />
      </Toolbar>

      <Shadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
