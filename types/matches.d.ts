export type MatchOptionType = '전체' | '솔로게임' | '자유랭크';

export type MatchDetails = {
  gameId: string;
  teams: {
    teamId: number;
    players: {
      champion: {
        imageUrl: string;
        level: number;
      };
      summonerId: string;
      summonerName: string;
    }[];
  }[];
};

export type TeamType = {
  teamId: number;
  players: player[];
};

export type GameType = {
  mmr: number;
  champion: {
    imageUrl: string;
    level: number;
  };
  spells: {
    imageUrl: string;
  }[];
  items: {
    imageUrl: string;
  }[];
  needRenew: false;
  gameId: string;
  createDate: number;
  gameLength: number;
  gameType: string;
  summonerId: string;
  summonerName: string;
  tierRankShort: string;
  stats: {
    general: {
      kill: number;
      death: number;
      assist: number;
      kdaString: string;
      cs: number;
      csPerMin: number;
      contributionForKillRate: string;
      goldEarned: number;
      totalDamageDealtToChampions: number;
      largestMultiKillString: string;
      opScoreBadge: string;
    };
    ward: { sightWardsBought: number; visionWardsBought: number };
  };
  mapInfo: null;
  peak: string[];
  isWin: true;
  teams?: TeamType[];
};

export type PlayerType = {
  champion: {
    imageUrl: string;
    level: number;
  };
  summonerId: string;
  summonerName: string;
};

export type MatchesInfoType = {
  games: GameType[];
  champions: [
    {
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
    },
  ];
  positions: [
    {
      games: number;
      wins: number;
      losses: number;
      position: string;
      positionName: string;
    },
  ];
  summary: {
    wins: number;
    losses: number;
    kills: number;
    deaths: number;
    assists: number;
  };
};
