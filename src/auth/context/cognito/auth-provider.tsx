import { useMemo, useEffect, useReducer, useCallback } from 'react';

//
import { AuthContext } from './auth-context';
import { AuthUserType, ActionMapType, AuthStateType, ESocialProvider } from '../../types';
import {
  createPKCE,
  signInCognito,
  signUpCognito,
  getCurrentUser,
  signOutCognito,
  createAuthorizeUri,
  confirmRegistration,
  signInCognitoByCode,
  resetPasswordCognito,
  forgotPasswordCognito,
  resendConfirmationCode,
} from './utils';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize().then();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const user = await signInCognito(email, password);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // LOGIN by authorize code
  const loginByAuthorizeCode = useCallback(async (code: string, callbackState: string) => {
    const codeVerifier = sessionStorage.getItem(`codeVerifier-${callbackState}`);
    sessionStorage.removeItem(`codeVerifier-${callbackState}`);
    if (codeVerifier) {
      const user = await signInCognitoByCode(code, codeVerifier);

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(async (email: string, password: string, name: string) => {
    await signUpCognito(email, password, name);
  }, []);

  // Forgot password
  const forgotPassword = useCallback(async (email: string) => {
    await forgotPasswordCognito(email);
  }, []);

  // Reset password
  const newPassword = useCallback(async (email: string, code: string, password: string) => {
    await resetPasswordCognito(email, code, password);
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      await signOutCognito();
    } catch (e) {
      console.error(e);
    }

    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // CONFIRM REGISTER
  const confirmRegister = useCallback(async (email: string, code: string) => {
    await confirmRegistration(email, code);
  }, []);

  // RESEND CODE REGISTER
  const resendCodeRegister = useCallback(async (email: string) => {
    await resendConfirmationCode(email);
  }, []);

  // GENERATE PKCE
  const generatePKCE = useCallback(async () => {
    const pkce = await createPKCE();
    // Set verifier state
    sessionStorage.setItem(`codeVerifier-${pkce.state}`, pkce.codeVerifier);
    return pkce;
  }, []);

  // GENERATE authorize uri with PKCE
  const generateAuthorizeUri = useCallback(
    async (provider: ESocialProvider) => {
      const { state: pkceState, codeChallenge } = await generatePKCE();

      return createAuthorizeUri(provider, pkceState, codeChallenge);
    },
    [generatePKCE]
  );

  // UPDATE USER PROFILE
  const updateUser = useCallback(async (user: AuthUserType) => {
    dispatch({
      type: Types.INITIAL,
      payload: {
        user,
      },
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'auth',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      loginByAuthorizeCode,
      register,
      forgotPassword,
      newPassword,
      logout,
      confirmRegister,
      resendCodeRegister,
      generatePKCE,
      generateAuthorizeUri,
      updateUser,
    }),
    [
      login,
      loginByAuthorizeCode,
      logout,
      forgotPassword,
      newPassword,
      register,
      state.user,
      status,
      confirmRegister,
      resendCodeRegister,
      generatePKCE,
      generateAuthorizeUri,
      updateUser,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
