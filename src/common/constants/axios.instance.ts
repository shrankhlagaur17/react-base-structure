import axios from 'axios';
import { Env } from './env';

export const API_URL = Env.BASE_URL;

export const api_error_code = {
  unauthorized: 401,
  accessDenied: 430,
  sessionExpired: 423,
  validationError: 400,
  emailNotVerified: 403,
  internalError: 500,
};

export const api_success_code = {
  success: 200,
};

export const $axios = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    platform: '3',
    language: 'en',
  },
});

$axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    } else {
      config.headers['Authorization'] = 'Basic aW5maW5pdGU6aW5maW5pdGVAMTIz';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
