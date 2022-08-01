import axios from '.';

const getSummonerBaseInfo = (name: string) => {
  return axios.get(`${encodeURIComponent(name)}`);
};

const getSummonerMostInfo = (name: string) => {
  return axios.get(`${encodeURIComponent(name)}/mostInfo`);
};

const getSummonerMatcheInfo = (name: string) => {
  return axios.get(`${encodeURIComponent(name)}/matches`);
};

export { getSummonerBaseInfo, getSummonerMostInfo, getSummonerMatcheInfo };
