// next
import Head from 'next/head';
// auth
import GuestGuard from '../../auth/GuestGuard';
// sections
import Login from '../../sections/auth/Login';
import MainLayout from 'src/layouts/main/MainLayout';

// ----------------------------------------------------------------------
// LoginPage.getLayout = (page: React.ReactElement) => <MainLayout pageName='login'> {page} </MainLayout>;

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> Login | Inner Circle</title>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
