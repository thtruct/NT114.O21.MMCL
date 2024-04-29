import axios, { AxiosRequestConfig } from 'axios';

// config
import { API_SERVICES, HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const USER_API = `${API_SERVICES.user.endpoint}${API_SERVICES.user.path}`;
export const DRIVER_API = `${API_SERVICES.driver.endpoint}${API_SERVICES.driver.path}`;
export const TRIP_API = `${API_SERVICES.trip.endpoint}${API_SERVICES.trip.path}`;

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: `${USER_API}users/profile`,
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  companies: {
    search: `${DRIVER_API}companies/search`,
    details: (id: string) => `${DRIVER_API}companies/${id}`,
    update: `${DRIVER_API}companies/:id`,
    updateExportCsvStatus: `${DRIVER_API}companies/export-csv-status`,
    invite: (id: string) => `${DRIVER_API}companies/${id}/invite`,
    searchPNR: (pnr: string) => `${DRIVER_API}companies/pnr/${pnr}`,
    activities: (pnr: string) => `${DRIVER_API}companies/pnr/${pnr}/activities`,
  },
  google: {
    place: {
      textSearch: 'https://places.googleapis.com/v1/places:searchText',
    },
  },
  user: {
    list: `${USER_API}users`,
    details: (id: string) => `${USER_API}users/${id}`,
    update: (id: string) => `${USER_API}users/${id}`,
    profile: `${USER_API}users/profile`,
  },
  driver: {
    details: `${DRIVER_API}transporters/company`,
    update: `${DRIVER_API}transporters/company`,
    agreements: `${DRIVER_API}transporters/agreements`,
    uploadDocument: `${DRIVER_API}transporters/upload-document`,
    addTransaction: `${DRIVER_API}transporters/agreements/sign-now`,
    getTransaction: (entranceCode: string) =>
      `${DRIVER_API}transporters/agreements/transaction/${entranceCode}`,
  },
  agreement: {
    list: `${DRIVER_API}agreements`,
    new: `${DRIVER_API}agreements`,
    details: (id: string) => `${DRIVER_API}agreements/${id}`,
    uploadPreSignedAgreement: `${DRIVER_API}agreements/upload-agreement`,
    getFileUrl: `${DRIVER_API}agreements/file-url`,
  },
  cvlDashboard: {
    list: `${TRIP_API}trips`,
    searchDrivers: `${DRIVER_API}drivers/search`,
    getDriverDetail: (id: number) => `${DRIVER_API}drivers/${id}`,
    getTripStatus: (id: string) => `${DRIVER_API}trips/${id}/status`,
    updateTrip: (id: string) => `${TRIP_API}trips/${id}`,
    invite: (id: string) => `${TRIP_API}trips/${id}/invite`,
  },
};
