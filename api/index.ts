import Axios, { AxiosError } from 'axios';

const axios = Axios.create({
  baseURL: 'https://codingtest.op.gg/api/summoner/',
  timeout: 10000,
  withCredentials: false,
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err: AxiosError) => {
    return Promise.reject(err.response);
  },
);

export default axios;
