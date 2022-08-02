import Image from 'next/image';
import styled from 'styled-components';
import { useAppSelector } from '../../store';
import { WidgetBoxStyle } from '../../styles/GeneralStyle';
import Colors from '../../styles/Colors';

interface IStyleProps {
  cardHeight: string;
  imageSize: string;
}

const RankCardContainer = styled.div<IStyleProps>`
  ${WidgetBoxStyle}
  height: ${({ cardHeight }) => cardHeight};
  display: flex;
  padding: 10px;
  .tier-image-area {
    width: 104px;
    display: flex;
    align-items: center;
    justify-content: center;
    > .tier-image {
      height: ${({ imageSize }) => imageSize};
      width: ${({ imageSize }) => imageSize};
      position: relative;
    }
  }
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
    .unranked {
      font-size: 13px;
      color: ${Colors.normalGray};
      font-weight: bold;
    }
  }
`;

interface IProps {
  mode: 'solo' | 'free';
}

const RankCard = ({ mode }: IProps) => {
  const selectedSummoner = useAppSelector((state) => state.summonerReducer.selected)!;
  const { hasResults, losses, wins, tierRank } = selectedSummoner.leagues[mode === 'solo' ? 0 : 1];
  const getFullTierRankName = (name: string) => (name === '솔랭' ? '솔로 랭크' : name);
  const variableStyle =
    mode === 'solo' ? { cardHeight: '120px', imageSize: '104px' } : { cardHeight: '98px', imageSize: '64px' };
  const imageUrl = hasResults ? tierRank.imageUrl : '/images/unranked.png';

  return (
    <RankCardContainer {...variableStyle}>
      <div className="tier-image-area">
        <div className="tier-image">
          <Image src={imageUrl} objectFit="contain" layout="fill" priority />
        </div>
      </div>
      <div className="description">
        <div className="rank-name">{getFullTierRankName(tierRank.name)}</div>
        {hasResults ? (
          <>
            {mode === 'solo' && (
              <div className="position">
                <span>탑</span> (총 {wins + losses}게임)
              </div>
            )}
            <div className="tier">{tierRank.tierDivision}</div>
            <div className="win-lose">
              <span className="lp">{tierRank.lp} LP </span> /
              <span>
                {wins}승 {losses}패
              </span>
            </div>

            <div className="win-rate">승률 {Math.floor((wins / (wins + losses)) * 100)} %</div>
          </>
        ) : (
          <div className="unranked">Unranked</div>
        )}
      </div>
    </RankCardContainer>
  );
};

export default RankCard;
