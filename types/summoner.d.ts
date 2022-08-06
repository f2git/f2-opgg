export type SummonerType = {
  name: string;
  level: number;
  profileImageUrl: string;
  profileBorderImageUrl: string;
  url: string;
  leagues: {
    hasResults: boolean;
    wins: number;
    losses: number;
    tierRank: {
      name: string;
      tier: string;
      tierDivision: string;
      string: string;
      shortString: string;
      division: string;
      imageUrl: string;
      lp: number;
      tierRankPoint: number;
    };
  }[];
  previousTiers: {
    name: string;
    tier: string;
    tierDivision: string;
    string: string;
    shortString: string;
    division: string;
    imageUrl: string;
    lp: number;
    tierRankPoint: 21;
    season: number;
  }[];
  ladderRank: {
    rank: number;
    rankPercentOfTop: number;
  };
  profileBackgroundImageUrl: string;
};

export type AutocompleteSummonerType = {
  id: number;
  summoner_id: string;
  acct_id: string;
  puuid: string;
  name: string;
  internal_name: string;
  profile_image_url: string;
  level: number;
  updated_at: string;
  solo_tier_info: string;
};
