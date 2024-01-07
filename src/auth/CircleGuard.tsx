import { createContext, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import { PATH_DASHBOARD } from 'src/routes/paths';
import getGroupById from 'src/api/getGroupById';
import { CircleFormProps } from 'src/sections/form/CreateGroupForm';
import getGroupCheckoutInfo from 'src/api/getGroupCheckoutInfo';
import { Price } from 'src/@types/stripe';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

type contextProps = {
  group: GroupAboutProps | null;
}

export type GroupAboutProps = {
  id:string;
  name: string;
  by: string;
  description: string;
  imageUrl: string;
  isPaying: boolean;
  community: boolean;
  plans: Price[];
  author: {
    name: string;
    id: string;
    imageUrl: string;
    role: string;
    socials: {
      facebook: string;
      linkedIn: string;
      youtube: string;
      twitter: string;
      website: string;
    }
  };
  members: {
    online: number;
    total: number;
  };
  userCanCheckout: boolean
};

export const GroupCheckoutContext = createContext<contextProps | null>(null);

export default function CircleGuard({ children }: GuestGuardProps) {
  const {
        query: { circle }, push
  } = useRouter();

  const [group, setGroup] = useState(null)

  useEffect(() => { 
    const getGroup = async () => {
      const response =  await getGroupCheckoutInfo(circle as string)
      if(!response){ return push(PATH_DASHBOARD.root)};
      setGroup(response)
  }
    if(circle){
        getGroup()
    }
  }, [circle])

  const memoizedValue = useMemo(
    () => ({
      group: group,
    }),
    [group]
  );

  if (!circle || !group) {
    return <LoadingScreen />;
  }

  return <GroupCheckoutContext.Provider value={memoizedValue}>{children}</GroupCheckoutContext.Provider>;
}