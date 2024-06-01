// API
// ----------------------------------------------------------------------

export const HOST_API = import.meta.env.VITE_HOST_API;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = '/'; // as '/dashboard'

export const COGNITO_API = {
  userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID || '',
  clientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_AWS_COGNITO_CLIENT_SECRET || '',
  domain: import.meta.env.VITE_AWS_COGNITO_DOMAIN || '',
  region: import.meta.env.VITE_AWS_COGNITO_REGION || 'eu-central-1',
};

export const API_SERVICES = {
  user: {
    endpoint: import.meta.env.VITE_API_SERVICES_USER_ENDPOINT || HOST_API,
    path: import.meta.env.VITE_API_SERVICES_USER_PATH || '/user/', // Include '/' at the end
  },
  driver: {
    endpoint: import.meta.env.VITE_API_SERVICES_TRANSPORTER_ENDPOINT || HOST_API,
    path: import.meta.env.VITE_API_SERVICES_TRANSPORTER_PATH || '/transporter/',
  },
  trip: {
    endpoint: import.meta.env.VITE_API_SERVICES_TRIP_ENDPOINT || HOST_API,
    path: import.meta.env.VITE_API_SERVICES_TRIP_PATH || '/transporter/', // FIXME: Update it to '/trip/'
  },
};

export const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || '';
