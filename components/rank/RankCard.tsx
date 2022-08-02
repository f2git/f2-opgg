import Image from 'next/image';
import styled from 'styled-components';
import { useAppSelector } from '../../store';
import { WidgetBoxStyle } from '../../styles/GeneralStyle';
import Colors from '../../styles/Colors';

const RankCardContainer = styled.div`
  ${WidgetBoxStyle}
  height: 124px;
  display: flex;
  padding: 10px;
  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
    > * + * {
      margin-top: 7px;
    }
    .position {
      span {
        font-weight: bold;
      }
    }
    .rank-name {
      font-size: 11px;
      color: ${Colors.normalGray};
    }
    .tier {
      font-size: 15px;
      color: ${Colors.mainBlue};
      font-weight: bold;
    }
    .win-lose {
      color: ${Colors.normalGray};
      .lp {
        font-weight: bold;
        color: ${Colors.almostBlack};
      }
    }
    .win-rate {
      color: ${Colors.normalGray};
    }
  }
`;

const RankCard = () => {
  const selectedSummoner = useAppSelector((state) => state.summonerReducer.selected)!;
  const { hasResults, losses, wins, tierRank } = selectedSummoner.leagues[0];
  const getFullTierRankName = (name: string) => (name === '솔랭' ? '솔로 랭크' : name);
  return (
    <RankCardContainer>
      <Image src={tierRank.imageUrl} width="104px" height="104px" />
      <div className="description">
        <div className="rank-name">{getFullTierRankName(tierRank.name)}</div>
        <div className="position">
          <span>탑</span> (총 {wins + losses}게임)
        </div>
        <div className="tier">{tierRank.tierDivision}</div>
        <div className="win-lose">
          <span className="lp">{tierRank.lp} LP </span> /
          <span>
            {wins}승 {losses}패
          </span>
        </div>
        <div className="win-rate">승률 {Math.floor((wins / (wins + losses)) * 100)} %</div>
      </div>
    </RankCardContainer>
  );
};

export default RankCard;
