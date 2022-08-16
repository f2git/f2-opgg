import { memo } from 'react';

import Image from 'next/image';
import styled from 'styled-components';
import { PieChart } from 'react-minimal-pie-chart';
import { useAppSelector } from '../../store';
import Colors from '../../styles/Colors';
import noChampAvatar from '../../public/images/noChampAvatar.svg';
import { default as GS } from '../../styles/GeneralStyle';
import ChampAvatar from '../common/ChampAvatar';
import KDA from '../common/numbers/KDA';
import WinRate from '../common/numbers/WinRate';

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
        width: 90px;
        height: 90px;
        .chart-win-rate {
          font-size: 14px;
          color: ${Colors.moreAlmostBlack};
          font-weight: bold;
          position: absolute;
        }
      }
    }
    .detail {
      ${GS.FlexColumnHorizontalCenter}
      justify-content: center;
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
          margin-bottom: 4px;
        }
        .details {
          font-size: 11px;
          .win-rate {
            font-weight: bold;
          }
          .spacer {
            color: ${Colors.widgetBorder};
          }
          .point {
            font-weight: bold;
          }
          .pick-rate {
            font-size: 11px;
            font-weight: bold;
            color: ${Colors.blue};
          }
        }

        .no-champion {
          font-size: 11px;
          color: ${Colors.lightGray};
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

  if (!matchesInfo) return <MatcheSummaryContainer />;

  const { summary, champions, games, positions } = matchesInfo;
  const { assists, deaths, kills, losses, wins } = summary;
  const gameCount = wins + losses;
  const winRate = (wins / gameCount) * 100;

  const avgContributionForKillRate =
    games.reduce<number>((acc, { stats }) => acc + Number(stats.general.contributionForKillRate.split('%')[0]), 0) /
    gameCount;
  // summary에 전체 킬관여율이 없어서 부득이하게 games에 문자열로 들어있는 contributionForKillRate들을 파싱해서 계산했습니다.

  const positionDic: { [char: string]: string } = { ADC: '바텀', SUP: '서포터', TOP: '탑', JNG: '정글', MID: '미드' };

  return (
    <MatcheSummaryContainer>
      <div className="chart-container">
        <div className="pie-chart-area">
          <div className="description">
            {gameCount}전 {wins}승 {losses}패
          </div>
          <div className="chart">
            <PieChart
              startAngle={-90}
              lineWidth={30}
              data={[
                { title: 'losses', value: 100 - winRate, color: Colors.red },
                { title: 'wins', value: winRate, color: Colors.blue },
              ]}
            />
            <div className="chart-win-rate">{Math.floor(winRate)}%</div>
          </div>
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
        {[...Array(3)].map((n, index) => {
          const c = champions[index];
          return c ? (
            <div className="list-item" key={`${c.id}-${index}`}>
              <div className="image-area">
                <ChampAvatar imageUrl={c.imageUrl} champKey={c.key} size="34px" />
              </div>
              <div className="description-area">
                <div className="name">{c.name}</div>
                <div className="details">
                  <span className="win-rate">
                    <WinRate wins={c.wins} losses={c.losses} colored />
                  </span>
                  {` `}({c.wins}승 {c.losses}패)
                  <span className="spacer"> | </span>
                  <span className="point">
                    <KDA mode="Point" k={c.kills} d={c.deaths} a={c.assists} colored extraText=" 평점" />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="list-item" key={`noChamp-${index}`}>
              <div className="image-area">
                <Image src={noChampAvatar} width={34} height={34} priority />
              </div>
              <div className="description-area">
                <div className="details">
                  <div className="no-champion">챔피언 정보가 없습니다.</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="position-container">
        <div className="title">선호 포지션 (랭크)</div>
        {positions.map((pos, index) => {
          return (
            <div className="list-item" key={pos.position + index}>
              <div className="image-area">
                <Image src={`/images/position/${pos.position}.svg`} width={28} height={28} priority />
              </div>
              <div className="description-area">
                <div className="name">{positionDic[pos.position]}</div>
                <div className="details">
                  <span className="pick-rate">{Math.floor((pos.games / gameCount) * 100)}%</span>
                  <span className="spacer"> | </span>
                  {index === 0 ? `Win Rate ` : '승률'}
                  <span className="win-rate">
                    <WinRate wins={pos.wins} losses={pos.losses} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </MatcheSummaryContainer>
  );
};

export default memo(MatchesSummary);
