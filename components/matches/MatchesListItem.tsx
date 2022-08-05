import styled from 'styled-components';
import Colors from '../../styles/Colors';
import { default as GS } from '../../styles/GeneralStyle';
import { ItemData } from '../../types/item';
import { Game } from '../../types/matches';
import secondToHMS, { timestampToString } from '../../utils/Time';
import ChampAvatar from '../common/ChampAvatar';
import KDA from '../common/numbers/KDA';
import TooltipIcon from './TooltipIcon';

const MatchesListItemContainer = styled.div`
  ${GS.FlexRow}
  background-color: #d6b5b2;
  height: 90px;
  .list-contents {
    ${GS.FlexRowVerticalCenter}
    border: 1px solid #c0aba8;
    border-right: none;
    font-size: 11px;
    color: ${Colors.moreAlmostBlack};
    > div {
      ${GS.FlexColumnHorizontalCenter}
      justify-content: space-around;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .summary-area {
      width: 70px;
      .type {
        font-weight: bold;
      }
      .date {
      }
      .spacer {
        margin-top: 4px;
        height: 1px;
        width: 25px;
        border-bottom: 1px solid ${Colors.lightGray};
      }
      .is-win {
        font-weight: bold;
        color: #d0021b;
      }
    }
    .champion-area {
      width: 100px;
      .avatar-spell {
        ${GS.FlexRow}
        justify-content: space-between;
        .spells {
          width: 48px;
          height: 48px;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: space-around;
        }
      }
    }
    .kda-area {
      flex: 1;
      .k-d-a {
        margin-top: 2px;
        font-size: 15px;
        color: ${Colors.almostBlack};
        font-weight: bold;
        letter-spacing: -1px;
      }
      .point {
        font-weight: bold;
      }
      .badges {
      }
    }
    .level-area {
      width: 90px;
      .kill-engagement-rate {
        color: ${Colors.darkRed};
        margin-bottom: 12px;
      }
    }
    .item-area {
      width: 114px;
      .item-ward-build {
        ${GS.FlexRow}
        width: 94px;
        height: 48px;
      }
      .item-icons,
      .ward-build-icons {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
      }
      .control {
        padding-top: 2px;
        font-size: 11px;
        color: #000;
      }
    }
    .summoner-area {
      width: 170px;
    }
  }
  .detail-button {
    width: 30px;
    background-color: #e89c95;
    border: 1px solid #c8817c;
  }
`;

interface IProps {
  gameInfo: Game;
  itemsInfo: {
    id: string;
    imageUrl: string;
    data: ItemData;
  }[];
}
const MatchesListItem = ({ gameInfo, itemsInfo }: IProps) => {
  const { champion, gameType, isWin, gameLength, createDate, spells, peak, stats, items, gameId } = gameInfo;
  const { kill, assist, death, cs, csPerMin, contributionForKillRate } = stats.general;
  const championKey = champion.imageUrl.split('champion/')[1].split('.png')[0];

  return (
    <MatchesListItemContainer>
      <div className="list-contents">
        <div className="summary-area">
          <div className="type">{gameType}</div>
          <div className="date">{timestampToString(createDate)}</div>
          <div className="spacer"> </div>
          <div className="is-win">{isWin ? '승리' : '패배'}</div>
          <div className="length">{secondToHMS(gameLength)}</div>
        </div>
        <div className="champion-area">
          <div className="avatar-spell">
            <ChampAvatar champKey={championKey} imageUrl={champion.imageUrl} size="46px" />
            <div className="spells">
              {spells.map((spell) => (
                <TooltipIcon
                  id={`${spell.imageUrl}-${gameId}`}
                  key={`${spell.imageUrl}-${gameId}`}
                  imageUrl={spell.imageUrl}
                />
              ))}
              {peak.map((p) => (
                <TooltipIcon id={`${p}-${gameId}`} key={`${p}-${gameId}`} imageUrl={p} size="22px" />
              ))}
            </div>
          </div>
          <div className="name">{championKey}</div>
        </div>
        <div className="kda-area">
          <div className="k-d-a">
            <KDA k={kill} d={death} a={assist} mode="Each" colored />
          </div>
          <div className="point">
            <KDA k={kill} d={death} a={assist} mode="Total" extraText=":1 " />
            평점
          </div>
          <div className="badges">뺏지 뺏지</div>
        </div>
        <div className="level-area">
          <div className="level">레벨 {champion.level}</div>
          <div className="cs">
            {cs} ({csPerMin}) CS
          </div>
          <div className="kill-engagement-rate">킬관여 {contributionForKillRate}%</div>
        </div>
        <div className="item-area">
          <div className="item-ward-build">
            <div className="item-icons">
              {[...Array(6)].map((n, index) => {
                const item = itemsInfo[index];
                const itemId = item && item.id;
                const tooltipId = item ? `${itemId}-${gameId}-${index}` : '';

                const tooltipText = item && {
                  title: item.data.name,
                  content: item.data.description,
                };
                return (
                  <TooltipIcon
                    id={tooltipId}
                    key={`${gameId}-${itemId}-${index}`}
                    imageUrl={item && item.imageUrl}
                    tooltipText={tooltipText}
                  />
                );
              })}
            </div>
            <div className="ward-build-icons">
              <TooltipIcon id="" size="22px" />
              <TooltipIcon id="" imageUrl="/images/icon-buildred-p.png" size="22px" />
            </div>
          </div>
          <div className="control">제어 와드 1</div>
        </div>
        <div className="summoner-area" />
      </div>
      <div className="detail-button" />
    </MatchesListItemContainer>
  );
};

export default MatchesListItem;
