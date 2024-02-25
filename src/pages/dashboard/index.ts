import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (router.pathname === '/dashboard' && user) {
      if (user?.isVerified) {
        router.push(PATH_DASHBOARD.circles);
      } else {
        router.push(PATH_AUTH.verify);
      }
    }
  }, [user, router]);

  return null;
}
