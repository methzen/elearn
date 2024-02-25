import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import { useAuthContext } from './useAuthContext';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

type VerifyGardProps = {
  children: React.ReactNode;
};

export default function VerifyGard({ children }: VerifyGardProps) {
  const { push } = useRouter();
  const { isAuthenticated, isVerified } = useAuthContext();
  useEffect(() => {
    if (isAuthenticated && isVerified) {
      push(PATH_DASHBOARD.root);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isVerified]);

  return <> {children} </>;
}
