export type MostOptionType = '챔피언 승률' | '7일간 랭크 승률';

export type ChampionType = {
  id: number;
  key: string;
  name: string;
  imageUrl: string;
  games: number;
  kills: number;
  deaths: number;
  assists: number;
  wins: number;
  losses: number;
  cs: number;
  rank: number;
};

export type RecentWinRateType = {
  id: number;
  key: string;
  name: string;
  imageUrl: string;
  wins: number;
  losses: number;
};

export type MostInfoType = {
  champions: ChampionType[];
  recentWinRate: RecentWinRateType[];
};
