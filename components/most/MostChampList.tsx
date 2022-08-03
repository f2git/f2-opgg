import styled from 'styled-components';
import Colors from '../../styles/Colors';
import { ChampionType, MostInfoType, MostOptionType, RecentWinRateType } from '../../types/mostInfo';
import ChampAvatar from '../common/ChampAvatar';
import KDA from '../common/numbers/KDA';
import BarChart from './BarChart';

const MostChampListContainer = styled.div`
  background-color: ${Colors.background};

  .list-item + .list-item {
    border-top: 1px solid ${Colors.widgetBorder};
  }
  .list-item {
    height: 53px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .column-center {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .avatar-area {
      margin: 0 10px 3px 15px;
    }
    .name-area {
      flex: 1;
    }
    .point-area {
      width: 90px;
    }
    .winRate-area {
      width: 60px;
    }
    .chart-area {
      width: 123px;
      margin: 8px;
    }
    .name,
    .point,
    .winRate,
    .recent-winRate {
      color: ${Colors.almostBlackPlusFewRed};
      font-size: 13px;
      font-weight: bold;
    }
    .cs,
    .kda,
    .game-counts {
      padding-top: 5px;
      font-size: 11px;
      color: ${Colors.normalGray};
    }
    .name {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .kda {
      word-spacing: -2px;
    }
    .recent-winRate {
      color: ${Colors.normalGray};
    }
  }
`;

const ChampListItem = (props: ChampionType) => {
  const { key, cs, wins, kills, deaths, assists, name, games, imageUrl } = props;
  return (
    <>
      <div className="avatar-area">
        <ChampAvatar imageUrl={imageUrl} champName={key} size="45px" />
      </div>
      <div className="name-area">
        <div className="name">{name}</div>
        <div className="cs">
          CS {cs} ({(cs / games).toFixed(1)})
        </div>
      </div>
      <div className="point-area column-center">
        <div className="point">
          <KDA k={kills} d={deaths} a={assists} extraText="평점" colored />
        </div>
        <div className="kda">
          <KDA mode="Each" k={kills} d={deaths} a={assists} games={games} />
        </div>
      </div>
      <div className="winRate-area column-center">
        <div className="winRate">{Math.floor((wins / games) * 100)}%</div>
        <div className="game-counts">{games}게임</div>
      </div>
    </>
  );
};

const RecentListItem = (props: RecentWinRateType) => {
  const { key, wins, losses, name, imageUrl } = props;
  return (
    <>
      <div className="avatar-area">
        <ChampAvatar imageUrl={imageUrl} champName={key} size="32px" />
      </div>
      <div className="name-area">
        <div className="name">{name}</div>
      </div>
      <div className="winRate recent-winRate">{Math.floor((wins / (wins + losses)) * 100)}%</div>
      <div className="chart-area">
        <BarChart wins={wins} losses={losses} />
      </div>
    </>
  );
};

interface IProps {
  mostOption: MostOptionType;
  mostInfo: MostInfoType;
}

const MostChampList = ({ mostOption, mostInfo }: IProps) => {
  const { champions, recentWinRate } = mostInfo!;
  const checkChamp = mostOption === '챔피언 승률';

  const listItem: ChampionType[] | RecentWinRateType[] = checkChamp ? champions : recentWinRate;
  const sortedListItem = [...listItem].sort((a, b) => b.wins + b.losses - (a.wins + a.losses));

  return (
    <MostChampListContainer>
      {sortedListItem.map((item, index) => {
        const key = `${index}-${item.id}-${mostOption}`; // API 데이터에 key, id, name 등이 중복된 경우가 있어 부득이 index 사용

        return (
          <div className="list-item" key={key}>
            {checkChamp ? ChampListItem(item as ChampionType) : RecentListItem(item as RecentWinRateType)}
          </div>
        );
      })}
    </MostChampListContainer>
  );
};

export default MostChampList;
