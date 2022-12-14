import Image from 'next/image';
import styled, { keyframes, css } from 'styled-components';
import Colors from '../../styles/Colors';
import { ChampionType, MostInfoType, MostOptionType, RecentWinRateType } from '../../types/mostInfo';
import ChampAvatar from '../common/ChampAvatar';
import KDA from '../common/numbers/KDA';
import WinRate from '../common/numbers/WinRate';
import BarChart from './BarChart';
import opggLogo from '../../public/images/opgglogo.svg';

const MostChampListContainer = styled.div`
  background-color: ${Colors.background};
`;

const ListItemFlip = keyframes`
  0%{
    transform: rotateX(90deg);     
  }
  50%{
    transform: rotateX(90deg);     
  }
  100%{
    transform: rotateX(0deg);
  }
`;

const ListItemBackFlip = keyframes`
  0%{
    transform: rotateX(0);    
  }

  50%{
    transform: rotateX(90deg);
  }
  
  100%{
    transform: rotateX(90deg);
  }
`;

const getDelay = (n: number) => `${(n + 1) * 0.045 + 0.1}`;

const MostChampionListItemContainer = styled.div<{ index: number }>`
  height: 53px;
  display: flex;
  flex: 1;
  position: relative;
  .list-item + .list-item {
  }
  .list-item {
    ${(props) =>
      css`
        animation: ${ListItemFlip} 0.25s ${getDelay(props.index)}s ease alternate;
      `}
    will-change: transform;
    animation-fill-mode: forwards;
    flex: 1;
    background-color: ${Colors.widgetBackground};
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid ${Colors.widgetBorder};
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

  .list-item-back {
    ${(props) =>
      css`
        animation: ${ListItemBackFlip} 0.25s ${getDelay(props.index)}s ease alternate;
      `}
    will-change: transform;
    animation-fill-mode: forwards;
    height: 53px;
    width: 298px;
    position: absolute;
    border-top: 1px solid ${Colors.widgetBorder};
    opacity: 1;
    background-color: ${Colors.widget};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ChampListItem = (props: ChampionType) => {
  const { key, cs, wins, kills, losses, deaths, assists, name, games, imageUrl } = props;

  return (
    <>
      <div className="avatar-area">
        <ChampAvatar imageUrl={imageUrl} champKey={key} size="45px" />
      </div>
      <div className="name-area">
        <div className="name">{name}</div>
        <div className="cs">
          CS {cs} ({(cs / games).toFixed(1)})
        </div>
      </div>
      <div className="point-area column-center">
        <div className="point">
          <KDA k={kills} d={deaths} a={assists} extraText=":1 ??????" colored />
        </div>
        <div className="kda">
          <KDA mode="Each" k={kills} d={deaths} a={assists} games={games} />
        </div>
      </div>
      <div className="winRate-area column-center">
        <div className="winRate">
          <WinRate wins={wins} losses={losses} colored />
        </div>
        <div className="game-counts">{games}??????</div>
      </div>
    </>
  );
};

const RecentListItem = (props: RecentWinRateType) => {
  const { key, wins, losses, name, imageUrl } = props;
  return (
    <>
      <div className="avatar-area">
        <ChampAvatar imageUrl={imageUrl} champKey={key} size="32px" />
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
  if (!mostInfo) return <MostChampListContainer />;

  const { champions, recentWinRate } = mostInfo;
  const checkChamp = mostOption === '????????? ??????';

  const listItem: ChampionType[] | RecentWinRateType[] = checkChamp ? champions : recentWinRate;
  const sortedListItem = [...listItem].sort((a, b) => b.wins + b.losses - (a.wins + a.losses));

  return (
    <MostChampListContainer>
      {sortedListItem.map((item, index) => {
        const key = `${index}-${item.id}-${mostOption}-${item.wins}`; // API ???????????? key, id, name ?????? ????????? ????????? ?????? ????????? index ??????
        return (
          <MostChampionListItemContainer index={index} key={key}>
            <div className="list-item">
              {checkChamp ? ChampListItem(item as ChampionType) : RecentListItem(item as RecentWinRateType)}
            </div>
            <div className="list-item-back">
              <Image width={50} height={20} src={opggLogo} priority />
            </div>
          </MostChampionListItemContainer>
        );
      })}
    </MostChampListContainer>
  );
};

export default MostChampList;
