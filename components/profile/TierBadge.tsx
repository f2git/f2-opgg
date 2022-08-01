import styled from 'styled-components';

const TierBadgeContainer = styled.div`
  height: 20px;
  border-radius: 2px;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e3e3;
  border: 1px solid #d0d3d4;
  padding-left: 5px;
  padding-right: 5px;
  span {
    font-weight: bold;
  }
`;

interface IProps {
  season: number;
  tier: string;
}

const TierBadge = ({ season, tier }: IProps) => {
  return (
    <TierBadgeContainer>
      <span>S{season}&nbsp;</span>
      {tier}
    </TierBadgeContainer>
  );
};

export default TierBadge;
