import {
  CognitoUser,
  CognitoIdToken,
  CognitoUserPool,
  ICognitoUserData,
  CognitoAccessToken,
  CognitoUserSession,
  CognitoRefreshToken,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import axios, { endpoints } from 'src/utils/axios';

import { COGNITO_API } from 'src/config-global';

import { paths } from '../../../routes/paths';
import { ESocialProvider } from '../../types';

// ----------------------------------------------------------------------
const UserPool = new CognitoUserPool({
  UserPoolId: COGNITO_API.userPoolId || '',
  ClientId: COGNITO_API.clientId || '',
});

// ----------------------------------------------------------------------

/**
 * Get cognito user session
 */
export const getCurrentUser = async (): Promise<{ [id: string]: any } | null> =>
  new Promise((resolve, reject) => {
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          reject(err);
        } else if (session === null) {
          resolve(null);
        } else {
          const idToken = session?.getIdToken();
          axios.defaults.headers.common.Authorization = idToken.getJwtToken();
          // getUserProfile
          axios.get(`${endpoints.auth.me}`).then((res) => {
            resolve({
              ...res.data,
              ...idToken.decodePayload(),
              accessToken: session?.getAccessToken().getJwtToken(),
            });
          });
        }
      });
    } else {
      resolve(null);
    }
  });

/**
 * SignIn Cognito user
 *
 * @param email
 * @param password
 */
export const signInCognito = (email: string, password: string): Promise<{ [id: string]: any }> =>
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        const idToken = session?.getIdToken();
        axios.defaults.headers.common.Authorization = idToken.getJwtToken();
        // getUserProfile
        axios.get(endpoints.auth.me).then((res) => {
          resolve({
            ...res.data,
            ...session.getIdToken().decodePayload(),
          });
        });
      },
      onFailure: (err) => {
        reject(err);
      },
      newPasswordRequired: () => {
        // Handle this on login page for update password.
        resolve({ message: 'newPasswordRequired' });
      },
    });
  });

/**
 * SignIn Cognito user by authorize code
 *
 * @param code
 * @param codeVerifier
 */
export const signInCognitoByCode = async (code: string, codeVerifier: string) => {
  const { domain, clientId } = COGNITO_API;
  const endpoint = `${domain}/oauth2/token`;

  try {
    const returnUri = `${paths.host}${paths.auth.socialCallback}`;
    // Exchange PKCE code for tokens
    const res = await axios.post(
      endpoint,
      {
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: returnUri,
        code,
        code_verifier: codeVerifier,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    // Decode token to get user id
    const data = res.data as { id_token: string; access_token: string; refresh_token: string };
    const userPayload = jwtDecode(data.id_token);

    const userData = {
      Username: userPayload?.sub, // The username or user ID of the authenticated user
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);
    // Authenticate the user using the access token
    cognitoUser.setSignInUserSession(
      new CognitoUserSession({
        IdToken: new CognitoIdToken({ IdToken: data.id_token }),
        RefreshToken: new CognitoRefreshToken({ RefreshToken: data.refresh_token }),
        AccessToken: new CognitoAccessToken({ AccessToken: data.access_token }),
      })
    );

    // Set Cognito SignIn User
    // getUserProfile
    axios.defaults.headers.common.Authorization = data.id_token;
    const user = await axios.get(endpoints.auth.me);

    return { ...user.data, ...userPayload };
  } catch (e) {
    console.error(e);
    throw new Error('Unexpected code');
  }
};

/**
 * Sign up Cognito user
 * @param email
 * @param password
 * @param name
 */
export const signUpCognito = (email: string, password: string, name: string) =>
  new Promise((resolve, reject) => {
    UserPool.signUp(
      email,
      password,
      [
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        }),
        new CognitoUserAttribute({
          Name: 'name',
          Value: name,
        }),
      ],
      [],
      async (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });

/**
 * Forgot password Cognito user
 * Send OTP to email
 */
export const forgotPasswordCognito = (email: string) =>
  new Promise((resolve, reject) => {
    const userData: ICognitoUserData = {
      Username: email,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);
    if (cognitoUser) {
      cognitoUser.forgotPassword({
        onSuccess(data) {
          console.log(data);
          resolve('Password reset code sent successfully');
        },
        onFailure(err) {
          console.error(err);
          if ('code' in err && err.code === 'UserNotFoundException') {
            // Custom Cognito error because it is not proper
            reject(new Error('User not found. Please check the email address.'));
          } else {
            reject(err);
          }
        },
      });
    } else {
      reject(new Error('Password reset request failed'));
    }
  });

/**
 * Reset password Cognito user
 */
export const resetPasswordCognito = (email: string, code: string, password: string) =>
  new Promise((resolve, reject) => {
    const userData: ICognitoUserData = {
      Username: email,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);
    if (cognitoUser) {
      cognitoUser.confirmPassword(code, password, {
        onSuccess(data) {
          console.log(data);
          resolve('Password was updated successfully');
        },
        onFailure(err) {
          console.error(err);
          if ('code' in err && err.code === 'UserNotFoundException') {
            reject(new Error('User not found. Please check the email address.'));
          } else {
            reject(new Error(err.message));
          }
        },
      });
    } else {
      reject(new Error('Password reset request failed'));
    }
  });

/**
 * Sign out Cognito user
 */
export const signOutCognito = () =>
  new Promise((resolve) => {
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      resolve(null);
    } else {
      resolve('You already logged out');
    }
  });

export const confirmRegistration = (email: string, code: string) =>
  new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err: { message: any }, result: any) => {
      if (err) {
        reject(err || JSON.stringify(err));
      }
      resolve(result);
    });
  });

export const resendConfirmationCode = (email: string) =>
  new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err || JSON.stringify(err));
        return;
      }
      resolve(result);
    });
  });

export const createPKCE = async () => {
  const state = await generateNonce();
  const codeVerifier = await generateNonce();
  const codeChallengeBuffer = await sha256(codeVerifier);
  const codeChallenge = arrayBufferToBase64Url(codeChallengeBuffer);
  return {
    state,
    codeVerifier,
    codeChallenge,
  };
};

export const createAuthorizeUri = (
  provider: ESocialProvider,
  pkceState: string,
  codeChallenge: string
) => {
  const { domain, clientId } = COGNITO_API;
  const authorizationEndpoint = `${domain}/oauth2/authorize`;
  const redirectUri = `${paths.host}${paths.auth.socialCallback}`;

  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'aws.cognito.signin.user.admin email openid phone profile',
    state: pkceState,
    code_challenge_method: 'S256', // Use PKCE with SHA-256
    code_challenge: codeChallenge, // Include the code_challenge
    identity_provider: provider,
  });

  return `${authorizationEndpoint}?${queryParams}`;
};

const sha256 = async (str: string): Promise<ArrayBuffer> =>
  crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));

const generateNonce = async (): Promise<string> => {
  const hash = await sha256(crypto.getRandomValues(new Uint32Array(4)).toString());
  const hashArray: number[] = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

const arrayBufferToBase64Url = (buffer: ArrayBuffer): string => {
  const binaryArray = Array.from(new Uint8Array(buffer));
  const binaryString = String.fromCharCode(...binaryArray);
  return btoa(binaryString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const jwtDecode = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};
