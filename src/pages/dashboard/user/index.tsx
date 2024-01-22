import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../../routes/paths';
// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/dashboard/user') {
      router.push(PATH_DASHBOARD.user.myprofile);
    }
  });

  return null;
}
