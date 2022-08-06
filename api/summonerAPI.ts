import { mainAxios, opggAxios } from '.';

const getSummonerBaseInfo = (name: string) => {
  return mainAxios.get(`${encodeURIComponent(name)}`);
};

const getSummonerMostInfo = (name: string) => {
  return mainAxios.get(`${encodeURIComponent(name)}/mostInfo`);
};

const getSummonerMatcheInfo = (name: string) => {
  return mainAxios.get(`${encodeURIComponent(name)}/matches`);
};

const getSummonerNames = (name: string) => {
  return opggAxios.get(`/${name}`);
};

export { getSummonerBaseInfo, getSummonerMostInfo, getSummonerMatcheInfo, getSummonerNames };
