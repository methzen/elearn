import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './useAuthContext';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
  childName?: string;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { push } = useRouter();
  const { isAuthenticated, isInitialized, isVerified } = useAuthContext();
  useEffect(() => {
    if (isAuthenticated) {
      if (isVerified) {
        push(PATH_DASHBOARD.root);
      }
      push(PATH_AUTH.verify);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isVerified]);

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
