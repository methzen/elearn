// next
import NextLink from 'next/link';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthVerifyCodeForm from './AuthVerifyCodeForm';
// assets
import { EmailInboxIcon } from '../../assets/icons';
import { useAuthContext } from 'src/auth/useAuthContext';


export default function Verify() {
  const { user } = useAuthContext()

  return (
    <>
      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />
      <Typography variant="h3" paragraph>
        Please check your email!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        We have emailed a 6-digit confirmation code to {user?.email}, please enter the code in below
        box to verify your email.
      </Typography>

      <AuthVerifyCodeForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Don’t have a code? &nbsp;
        <Link variant="subtitle2">Resend code</Link>
      </Typography>

      <Link
        component={NextLink}
        href={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
    </>
  );
}
