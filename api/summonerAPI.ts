import { mainAxios, opggAxios } from '.';
import { GameType, MatchesInfoType } from '../types/matches';

export const getSummonerBaseInfo = async (name: string) => {
  return mainAxios.get(`${encodeURIComponent(name)}`);
};

export const getSummonerMostInfo = async (name: string) => {
  return mainAxios.get(`${encodeURIComponent(name)}/mostInfo`);
};

export const getMatchDetail = async (name: string, gameId: string) => {
  return mainAxios.get(`${encodeURIComponent(name)}/matchDetail/${encodeURIComponent(gameId)}`);
};

export const getSummonerMatchInfo = async (name: string) => {
  const matches: MatchesInfoType = await (await mainAxios.get(`${encodeURIComponent(name)}/matches`)).data;

  const newGames: GameType[] = await Promise.all(
    matches.games.map(async (game) => {
      const teams = await (await getMatchDetail(game.summonerName, game.gameId)).data.teams;
      return { ...game, teams };
    }),
  );

  const sortedNewGames = newGames.sort((a: GameType, b: GameType) => b.createDate - a.createDate);

  return { ...matches, games: sortedNewGames };
};

export const getSummonerNames = (name: string) => {
  return opggAxios.get(`/${name}`);
};
