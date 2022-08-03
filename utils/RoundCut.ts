interface IProps {
  OriginalNumber: number;
  DecimalPoint: number;
}

const RoundCut = (OriginalNumber: number, DecimalPoint: number) => {
  const n = 10 ** DecimalPoint;
  return Math.floor(OriginalNumber * n) / n;
};

export default RoundCut;
