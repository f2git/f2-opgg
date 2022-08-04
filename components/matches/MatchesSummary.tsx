import Image from 'next/image';
import styled from 'styled-components';
import Colors from '../../styles/Colors';
import noChampAvatar from '../../public/images/noChampAvatar.svg';
import { default as GS } from '../../styles/GeneralStyle';

import ChampAvatar from '../common/ChampAvatar';
import { useAppSelector } from '../../store';
import KDA from '../common/numbers/KDA';
import WinRate from '../common/numbers/WinRate';
import { Game } from '../../types/matches';

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

        .kill-engagement-rate {
          font-weight: bold;
          color: ${Colors.darkRed};
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
  const { summary, games } = matchesInfo!;
  const { assists, deaths, kills, losses, wins } = summary;
  const gameCount = wins + losses;

  const avgContributionForKillRate =
    games.reduce<number>((acc, { stats }) => acc + Number(stats.general.contributionForKillRate.split('%')[0]), 0) /
    gameCount;
  // summary에 전체 킬관여율이 없어서 부득이하게 games에 문자열로 들어있는 contributionForKillRate들을 파싱해서 계산했습니다.

  return (
    <MatcheSummaryContainer>
      <div className="chart-container">
        <div className="pie-chart-area">
          <div className="description">
            {gameCount}전 {wins}승 {losses}패
          </div>
          <div className="chart">2</div>
        </div>
        <div className="detail">
          <div className="avg">
            <KDA k={kills} d={deaths} a={assists} mode="Each" games={gameCount} colored />
          </div>
          <div className="kda">
            <span className="point">
              <KDA k={kills} d={deaths} a={assists} extraText=":1" colored />
            </span>
            <span className="kill-engagement-rate"> ({Math.floor(avgContributionForKillRate)}%)</span>
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
