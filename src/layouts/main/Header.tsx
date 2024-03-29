// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Link, BoxProps } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// routes
// components
import Logo from '../../components/logo';
//
import NavMobile from './nav/mobile';
import navConfig from './nav/config-navigation';
import NavDesktop from './nav/desktop';

// ----------------------------------------------------------------------
interface Props {
  pageName?: string;
}

export default function Header({ pageName }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />

          <Link href={'/'} target="_blank" rel="noopener" underline="none" sx={{ ml: 1 }}></Link>

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} />}

          {pageName && ['login', 'register'].includes(pageName) ? null : (
            <Button
              variant="contained"
              rel="noopener"
              href={`/payment?p=Basic&trial`}
              sx={{ bgcolor: 'text.primary' }}
            >
              Try For Free
            </Button>
          )}
          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

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
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
