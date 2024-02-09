import { useContext } from 'react';
//
import { SocketContext } from '../pages/_app';

// ----------------------------------------------------------------------

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) throw new Error('SocketContext context must be used inside PROVIDER');

  return context;
};