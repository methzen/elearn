// next
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import { PATH_AUTH } from 'src/routes/paths';
const Header = dynamic(() => import('../../layouts/main/Header'), { ssr: false });
const Footer = dynamic(() => import('../../layouts/main/Footer'), { ssr: false });

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <>
      <Header pageName="login" />
      <LoginLayout>
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
          <Typography variant="h4">Sign in</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">New user?</Typography>

            <Link component={NextLink} href={PATH_AUTH.register} variant="subtitle2">
              Create an account
            </Link>
          </Stack>
        </Stack>
        <AuthLoginForm />
      </LoginLayout>
      <Footer />
    </>
  );
}
