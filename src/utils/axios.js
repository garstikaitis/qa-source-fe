import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthService } from '@/api';
import store from '@/store';
// import store from '@/store';

axios.defaults.baseURL = 'http://qa-source.test/api/';
axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get('authToken')}`;

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
    const { status, statusText } = error.response;
    const authService = new AuthService();
    if(status === 401 && statusText === "Unauthorized") store.dispatch('auth/logout');
  });
