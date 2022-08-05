export type ItemData = {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  from: string[];
  into: string[];
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  gold: {
    base: number;
    purchasable: true;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: {
    '11': boolean;
    '12': boolean;
    '21': boolean;
    '22': boolean;
  };
  stats: {
    FlatHPPoolMod: number;
  };
  depth: number;
};

export type Items = {
  type?: string;
  version?: string;
  basic?: { name: string };
  data: {
    [index: string]: itemData;
  };
  groups?: {
    id: string;
    MaxGroupOwnable: string;
  }[];
  tree?: {
    header: string;
    tags: string[];
  }[];
};
