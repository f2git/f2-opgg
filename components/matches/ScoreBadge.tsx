import styled from 'styled-components';
import { default as GS } from '../../styles/GeneralStyle';

const ScoreBadgeContainer = styled.div<{ name: string }>`
  ${GS.FlexHorizontalVertiCalenterStyle}
  color:white;
  font-size: 10px;
  width: 44px;
  height: 18px;
  background-color: ${({ name }) => (name === 'ACE' ? '#ec4f48' : '#8c51c5')};
  border: 1px solid ${({ name }) => (name === 'ACE' ? '#bf3b36' : '#7f3590')};
  border-radius: 9px;
`;

const ScoreBadge = ({ name }: { name: string }) => {
  return <ScoreBadgeContainer name={name}>{name}</ScoreBadgeContainer>;
};

export default ScoreBadge;
