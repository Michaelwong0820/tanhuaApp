import axios from 'axios';
import {BASE_URI} from './api';
import Toast from './Toast';
const instance = axios.create({
  baseURL: BASE_URI,
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    Toast.showLoading('加载中');
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
// 响应拦截器
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    Toast.hideLoading();
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
export default {
  get: instance.get,
  post: instance.post,
};
