import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  VERIFY= 'VERIFY'
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
    isVerified: boolean
  };
  [Types.LOGIN]: {
    user: AuthUserType;
    isAuthenticated: boolean;
    isVerified: boolean;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
    isAuthenticated: boolean;
    isVerified: boolean;
  };
  [Types.VERIFY]: {
    user: AuthUserType;
    isAuthenticated: boolean;
    isVerified: boolean;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  isVerified:false
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      isVerified: action.payload.isVerified
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      isVerified: action.payload.isVerified
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      isVerified: action.payload.isVerified,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      isVerified: false
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('x-auth-token') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const response = await axios.get('/users/authenticate/v2');
        const user = response.data;
        user.displayName = `${user.firstname} ${user.lastname}` 

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
            isVerified: !!user.isVerified
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
            isVerified: false
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
          isVerified: false
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const response = await axios.post('/users/login/v2', {
      email,
      password,
    });
    const user = response.data
    user.displayName = `${user.firstname} ${user.lastname}` 
    setSession(response.headers["x-auth-token"] as string);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
        isAuthenticated: true,
        isVerified: !!user.isVerified
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstname: string, lastname: string, company:string, role: string) => {

        const response = await axios.post('/users/create/user', {
          email,
          password,
          firstname,
          lastname,
          company,
          role
        },
        {
          withCredentials: true
      });
        const user = response.data
        user.displayName = `${user.firstname} ${user.lastname}` 
        localStorage.setItem('x-auth-token', response.headers["x-auth-token"] as string);
        dispatch({
          type: Types.REGISTER,
          payload: {
            user,
            isAuthenticated : true,
            isVerified: !!user.isVerified
          },
        });
      },
    []
  );

  const verify = useCallback(
    async (code: string) => {
      const accessToken = storageAvailable ? localStorage.getItem('x-auth-token') : '';
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const response = await axios.post('/users/verify/user', {
          code,
        },
        {
          withCredentials: true
      });
        const user = response.data
        user.displayName = `${user.firstname} ${user.lastname}` 
        localStorage.setItem('x-auth-token', response.headers["x-auth-token"] as string);
        dispatch({
          type: Types.VERIFY,
          payload: {
            user,
            isAuthenticated : true,
            isVerified: !!user.isVerified
          },
        });
      }
      },
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      isVerified: state.isVerified,
      method: 'jwt',
      login,
      register,
      logout,
      verify,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register, verify]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
