const Pallet = {
  header: '#1ea1f7',
  blue: '#1f8ecd',
  red: '#ee5a52',
  darkRed: '#c6443e',
  background: '#eaeaea',
  widgetBackground: '#ededed',
  widget: '#f2f2f2',
  widgetBorder: '#cdd2d2',
  normalGray: '#879292',
  lightGray: '#999999',
  darkGray: '#666666',
  moreAlmostBlack: '#555555',
  almostBlack: '#555e5e',
  almostBlackPlusFewRed: '#5e5e5e',
  kda3: '#2daf7f',
  kda4: '#1f8ecd',
  kda5: '#e19205',
  point: '#e19205',
};

export const getKDAColor = (kda: number) => {
  let color = '';
  if (kda >= 5) {
    color = Pallet.kda5;
  } else if (kda >= 4) {
    color = Pallet.kda4;
  } else if (kda >= 3) {
    color = Pallet.kda3;
  }
  return color;
};

export const getWinRateColor = (winRate: number) => {
  let color = '';
  if (winRate >= 60) {
    color = Pallet.darkRed;
  }

  return color;
};

export const getPointColor = (point: number) => {
  let color = '';
  if (point >= 6) {
    color = Pallet.kda5;
  }

  return color;
};

export default Pallet;
