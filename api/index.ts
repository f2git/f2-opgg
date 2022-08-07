import Axios from 'axios';

const mainAxios = Axios.create({
  baseURL: 'https://codingtest.op.gg/api/summoner/',
  timeout: 10000,
  withCredentials: false,
});

const opggAxios = Axios.create({
  baseURL: '/getSummerAutocomplete',
  timeout: 10000,
  withCredentials: false,
});

export { mainAxios, opggAxios };
