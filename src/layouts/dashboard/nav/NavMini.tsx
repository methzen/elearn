// @mui
import { Stack, Box } from '@mui/material';
// config
import { NAV } from '../../../config-global';
// utils
import { hideScrollbarX } from '../../../utils/cssStyles';
// components
import Logo from '../../../components/logo';
import { NavSectionMini } from '../../../components/nav-section';
//
import {GroupNav, HomeNav} from './config-navigation';
import NavToggleButton from './NavToggleButton';
import { useRouter } from 'next/router'
import { useContext } from 'react';
import { CircleAccessRoleContext, RoleType } from 'src/auth/CircleAccessGuard';
// ----------------------------------------------------------------------

export default function NavMini() {

  const {
    query: { circleId },
  } = useRouter();
  const context = useContext(CircleAccessRoleContext)
  const isAdmin = context?.role === RoleType.admin
  const NavConfig = circleId ? GroupNav(circleId as string, isAdmin as boolean, context?.name as string) : HomeNav

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavSectionMini data={NavConfig} />
      </Stack>
    </Box>
  );
}
