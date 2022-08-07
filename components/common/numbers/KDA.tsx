import { memo } from 'react';
import styled from 'styled-components';
import Colors, { getKDAColor, getPointColor } from '../../../styles/Colors';
import RoundCut from '../../../utils/RoundCut';

interface IStyledProp {
  kdaColor?: string;
  highlight?: boolean;
}

const KDAContainer = styled.span<IStyledProp>`
  color: ${({ kdaColor }) => kdaColor};
  .highlight {
    color: ${({ highlight }) => highlight && Colors.darkRed};
  }
`;

interface IProps {
  mode?: 'Total' | 'Each' | 'Point';
  colored?: boolean;
  extraText?: string;
  k: number;
  a: number;
  d: number;
  games?: number;
}

const KDA = (props: IProps) => {
  const { k, d, a, games, mode, extraText, colored } = props;
  let res;

  if (mode === 'Total' || mode === 'Point') {
    const value = d !== 0 ? Number(RoundCut((k + a) / d, 2)) : 0;

    let color = '';
    if (colored)
      if (mode === 'Point') color = getPointColor(value);
      else color = getKDAColor(value);

    res = (
      <KDAContainer kdaColor={color}>
        {value}
        {extraText}
      </KDAContainer>
    );
  } else {
    const point = games === 1 ? 0 : 1;
    const kAvg = RoundCut(k / games!, point);
    const aAvg = RoundCut(a / games!, point);
    const dAvg = RoundCut(d / games!, point);
    res = (
      <KDAContainer highlight={colored}>
        {kAvg} / <span className="highlight"> {aAvg} </span> / {dAvg}
      </KDAContainer>
    );
  }
  return res;
};

KDA.defaultProps = {
  mode: 'Total',
  colored: false,
  extraText: '',
  games: 1,
};

export default memo(KDA);
