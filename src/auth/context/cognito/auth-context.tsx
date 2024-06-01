import { createContext } from 'react';

//
import { CognitoContextType } from '../../types';

// ----------------------------------------------------------------------

export const AuthContext = createContext({} as CognitoContextType);
