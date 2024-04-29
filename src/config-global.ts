// API
// ----------------------------------------------------------------------

export const HOST_API = import.meta.env.VITE_HOST_API;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

export const FIREBASE_API = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const AMPLIFY_API = {
  userPoolId: import.meta.env.VITE_AWS_AMPLIFY_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
  region: import.meta.env.VITE_AWS_AMPLIFY_REGION,
};

export const AUTH0_API = {
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  callbackUrl: import.meta.env.VITE_AUTH0_CALLBACK_URL,
};

export const SUPABASE_API = {
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

export const MAPBOX_API = import.meta.env.VITE_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = '/'; // as '/dashboard'

export const COGNITO_API = {
  userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID || '',
  clientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID || '',
  domain: import.meta.env.VITE_AWS_COGNITO_DOMAIN || '',
  region: import.meta.env.VITE_AWS_COGNITO_REGION || 'eu-central-1',
};

export const GOOGLE_MAP = {
  key: import.meta.env.VITE_GOOGLE_MAP_KEY || '',
  mapId: import.meta.env.VITE_GOOGLE_MAP_ID || '',
  defaultCenter: {
    lat: Number(import.meta.env.VITE_GOOGLE_MAP_CENTER_LAT || 52.36392665726305),
    lng: Number(import.meta.env.VITE_GOOGLE_MAP_CENTER_LNG || 4.906387708268893),
  },
  defaultZoom: 14,
  minZoom: 8,
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

export const VERSION = 'v3.0.0';
