import { createContext, useEffect, useState, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import { PATH_DASHBOARD } from 'src/routes/paths';
import checkGroupAccess, { Role } from 'src/api/groupAccess';

// ----------------------------------------------------------------------

type CircleAccessProps = {
  children: React.ReactNode;
};
export interface RoleContextProps {
  role: Role
}

export enum RoleType {
  admin='admin',
  member='member',
  moderator = 'moderator'
}

export const CircleAccessRoleContext = createContext<RoleContextProps| null>(null)

export default function CircleAccessGuard({ children }: CircleAccessProps) {
  const {
        query: { circleId }, push
  } = useRouter();

  const [access, setAccess] = useState<boolean|null>(null)
  const [myRole, setMyRole] = useState<Role>()

  useEffect(() => { 
    const getAccess = async () => {
      const response =  await checkGroupAccess(circleId as string)
      if(!response.access){ return push(PATH_DASHBOARD.root)};
      setAccess(response.access)
      setMyRole(response.role)
  }
    if(circleId){
        getAccess()
    }
  }, [circleId])

  const memoizedValue = useMemo(
    () => ({
      role: myRole,
    } as RoleContextProps),
    [myRole]
  );

  if (access===null) {
    return <LoadingScreen />;
  }

  return <CircleAccessRoleContext.Provider value={memoizedValue}>{children}</CircleAccessRoleContext.Provider>;
}
