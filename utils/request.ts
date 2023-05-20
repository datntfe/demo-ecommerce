import axios from 'axios';
import { HostAPIENV } from '../config';

const request = axios.create({
  baseURL: 'https://api-beta.shopdi.io',
  headers: {
    'content-type': 'application/json',
  },
});

if (typeof window !== 'undefined') {
  request.interceptors.request.use((config) => {
    const locale =
      localStorage.getItem('locale') !== null
        ? String(localStorage.getItem('locale'))
        : 'vi';

    if (config?.headers) {
      config.headers.AcceptLanguage = locale;
    }
    return config;
  });
}

request.interceptors.response.use(
  (response) => response,
  (err) => {
    const isServer = typeof window === 'undefined';
    const error = err.response;
    if (error?.status === 401 && !error.config._retry && !isServer) {
      error.config._retry = true;
      const RefreshToken = localStorage.getItem('_uRefresh');
      request.interceptors.request.eject(0);
      if (RefreshToken) {
        let jwtToken = '';
        axios
          .post(`${HostAPIENV}/api/v1/auth/refresh_token`, {
            refresh_token: RefreshToken,
          })
          .then((res) => {
            console.log(res.data.data);
            jwtToken = res.data.data.access_token;
            if (error && error.config.headers) {
              localStorage.setItem('_uRefresh', res.data.data.refresh_token);
              localStorage.setItem('_u', jwtToken);
              request.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
              return request(error.config);
            }
          })
          .catch((error) => {
            localStorage.removeItem('_uRefresh');
            localStorage.removeItem('_u');
          });
      }
    }

    return Promise.reject(err);
  },
);

export default request;
