import Image from 'next/image';
import styled from 'styled-components';
import Colors from '../../styles/Colors';
import noChampAvatar from '../../public/images/noChampAvatar.svg';
import { default as GS } from '../../styles/GeneralStyle';

import ChampAvatar from '../common/ChampAvatar';
import { useAppSelector } from '../../store';
import KDA from '../common/numbers/KDA';

const MatcheSummaryContainer = styled.div`
  height: 158px;
  background-color: ${Colors.widgetBackground};
  border: 1px solid #ccc;
  display: flex;
  > div + div {
    border-left: 1px solid #ccc;
  }
  .chart-container {
    ${GS.FlexRowVerticalCenter}
    flex: 1;

    .pie-chart-area {
      ${GS.FlexColumnHorizontalCenter}
      width: 138px;
      justify-content: space-around;
      height: 100%;
      padding: 12px;

      .description {
        font-size: 12px;
        color: ${Colors.darkGray};
      }
      .chart {
        ${GS.FlexHorizontalVertiCalenterStyle};
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
      }
    }
    .detail {
      ${GS.FlexColumnHorizontalCenter}
      flex: 1;
      .avg {
        font-size: 11px;
        font-weight: bold;
      }
      .kda {
        margin-top: 6px;
        font-size: 16px;
        .point {
          font-weight: bold;
        }
      }
    }
  }

  .champ-container, //champ-container와 position-container의 구조가 비슷하므로 스타일 공유
  .position-container {
    .list-item {
      ${GS.FlexRowVerticalCenter}
      flex: 1;
      width: 100%;

      .image-area {
        padding-left: 16px;
        padding-right: 8px;
      }
      .description-area {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 14px;
          font-weight: bold;
        }
        .details {
          font-size: 11px;
          padding-top: 5px;
        }
      }
    }
  }
  .champ-container {
    ${GS.FlexColumn}
    width: 228px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .position-container {
    ${GS.FlexColumn}
    width: 184px;

    .title {
      width: 100%;
      padding: 14px;
      margin-bottom: 10px;
      height: 30px;
      font-size: 12px;
      color: ${Colors.darkGray};
    }
  }
`;

const MatchesSummary = () => {
  const { matchesInfo } = useAppSelector(({ matchesReducer }) => matchesReducer);
  const { summary } = matchesInfo!;
  const { assists, deaths, kills, losses, wins } = summary;
  const games = wins + losses;

  return (
    <MatcheSummaryContainer>
      <div className="chart-container">
        <div className="pie-chart-area">
          <div className="description">
            {games}전 {wins}승 {losses}패
          </div>
          <div className="chart">2</div>
        </div>
        <div className="detail">
          <div className="avg">
            <KDA k={kills} d={deaths} a={assists} mode="Each" games={games} colored />
          </div>
          <div className="kda">
            <span className="point">
              <KDA k={kills} d={deaths} a={assists} colored />
            </span>
            {' (50%)'}
          </div>
        </div>
      </div>
      <div className="champ-container">
        <div className="list-item">
          <div className="image-area">
            <Image src={noChampAvatar} width={34} height={34} />
          </div>
          <div className="description-area">
            <div className="name">룰루</div>
            <div className="details">70% (7승 3패) 13.01 평점</div>
          </div>
        </div>
        <div className="list-item">
          <div className="image-area">
            <Image src={noChampAvatar} width={34} height={34} />
          </div>
          <div className="description-area">
            <div className="name">룰루</div>
            <div className="details">70% (7승 3패) 13.01 평점</div>
          </div>
        </div>
        <div className="list-item">
          <div className="image-area">
            <Image src={noChampAvatar} width={34} height={34} />
          </div>
          <div className="description-area">
            <div className="name">룰루</div>
            <div className="details">70% (7승 3패) 13.01 평점</div>
          </div>
        </div>
      </div>
      <div className="position-container">
        <div className="title">선호 포지션 (랭크)</div>
        <div className="list-item">
          <div className="image-area">
            <Image src={noChampAvatar} width={34} height={34} />
          </div>
          <div className="description-area">
            <div className="name">탑</div>
            <div className="details">70% | 13.01 평점</div>
          </div>
        </div>
        <div className="list-item">
          <div className="image-area">
            <Image src={noChampAvatar} width={34} height={34} />
          </div>
          <div className="description-area">
            <div className="name">탑</div>
            <div className="details">70% | 13.01 평점</div>
          </div>
        </div>
      </div>
    </MatcheSummaryContainer>
  );
};

export default MatchesSummary;
