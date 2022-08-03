const Pallet = {
  header: '#1ea1f7',
  mainBlue: '#1f8ecd',
  background: '#eaeaea',
  widget: '#f2f2f2',
  widgetBorder: '#cdd2d2',
  normalGray: '#879292',
  almostBlack: '#555e5e',
  almostBlackPlusFewRed: '#5e5e5e',
  darkRed: '#c6443e',
  kda3: '#2daf7f',
  kda4: '#1f8ecd',
  kda5: '#e19205',
  winRate: '#c6443e',
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

export default Pallet;
