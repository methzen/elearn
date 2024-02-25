// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link, Box } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthRegisterForm from './AuthRegisterForm';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../../layouts/main/Header'), { ssr: false });
const Footer = dynamic(() => import('../../layouts/main/Footer'), { ssr: false });
// ----------------------------------------------------------------------

export default function Register() {
  return (
    <>
      <Header pageName="register" />
      <LoginLayout>
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
          <Typography variant="h4">Get started absolutely free.</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2"> Already have an account? </Typography>
            <Link component={NextLink} href={PATH_AUTH.login} variant="subtitle2">
              Sign in
            </Link>
          </Stack>
        </Stack>
        <AuthRegisterForm />
        <Typography
          component="div"
          sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
        >
          {'By signing up, I agree to '}
          <Link underline="always" color="text.primary">
            Terms of Service
          </Link>
          {' and '}
          <Link underline="always" color="text.primary">
            Privacy Policy
          </Link>
          .
        </Typography>
      </LoginLayout>
      <Footer />
    </>
  );
}
