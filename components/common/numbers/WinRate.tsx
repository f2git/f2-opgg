import styled from 'styled-components';
import { getWinRateColor } from '../../../styles/Colors';

const WinRateContainer = styled.span<{ color?: string }>`
  color: ${({ color }) => color};
`;

interface IProps {
  colored?: boolean;
  wins: number;
  losses: number;
}

const WinRate = (props: IProps) => {
  const { wins, losses, colored } = props;
  const winRate = Math.floor((wins / (wins + losses)) * 100);
  const color = colored ? getWinRateColor(winRate) : '';

  return <WinRateContainer color={color}>{winRate}%</WinRateContainer>;
};

WinRate.defaultProps = {
  colored: false,
};

export default WinRate;
