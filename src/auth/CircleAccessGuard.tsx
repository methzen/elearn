import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import { PATH_DASHBOARD } from 'src/routes/paths';
import checkGroupAccess from 'src/api/groupAccess';

// ----------------------------------------------------------------------

type CircleAccessProps = {
  children: React.ReactNode;
};

export default function CircleAccessGuard({ children }: CircleAccessProps) {
  const {
        query: { circleId }, push
  } = useRouter();

  const [access, setAccess] = useState(null)

  useEffect(() => { 
    const getAccess = async () => {
      const response =  await checkGroupAccess(circleId as string)
      if(!response){ return push(PATH_DASHBOARD.root)};
      setAccess(response)
  }
    if(circleId){
        getAccess()
    }
  }, [circleId])

  if (access===null) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
