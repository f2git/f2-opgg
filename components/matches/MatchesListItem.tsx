import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';
import Colors from '../../styles/Colors';
import { default as GS } from '../../styles/GeneralStyle';
import { Items } from '../../types/item';
import { GameType, PlayerType } from '../../types/matches';
import secondToHMS, { timestampToString } from '../../utils/Time';
import ChampAvatar from '../common/ChampAvatar';
import KDA from '../common/numbers/KDA';
import ScoreBadge from './ScoreBadge';
import TooltipIcon from './TooltipIcon';
import ItemsInfo from '../../public/data/item.json';

const ListItemFlip = keyframes`
  0%{
    opacity: 0;
    transform: translateX(100px);     
  }
  50%{
    opacity: 1;
    transform: translateX(10px);     
  }
  100%{
    opacity: 1;
    transform: translateX(0px);     
  }
`;

const getDelay = (n: number) => `${n * 0.06}`;

const MatchesListItemContainer = styled.div<{ index: number; isWin: boolean }>`
  ${GS.FlexRow}
  background-color: ${({ isWin }) => (isWin ? '#d6b5b2' : '#b0ceea')};
  height: 90px;
  opacity: 0;

  ${(props) =>
    css`
      animation: ${ListItemFlip} 0.15s ${getDelay(props.index)}s linear;
    `}
  will-change: transform,opacity;
  animation-fill-mode: forwards;
  .list-contents {
    ${GS.FlexRowVerticalCenter}
    border: 1px solid ${({ isWin }) => (isWin ? '#c0aba8' : '#a1b8cd')};
    border-right: none;
    font-size: 11px;
    color: ${Colors.moreAlmostBlack};

    > div:not(.summoner-area) {
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
        color: ${({ isWin }) => (isWin ? '#d0021b' : '#2c709b')};
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
        ${GS.FlexRowVerticalCenter}
        justify-content: center;
        padding-top: 2px;
        font-size: 11px;
        color: #000;
        .name {
          padding-left: 3px;
        }
      }
    }
    .summoner-area {
      display: flex;
      flex-direction: row;
      height: 100%;
      width: 170px;

      .team {
        ${GS.FlexColumnVerticalCenter}
        flex-wrap: wrap;
        flex: 1;
        > .player {
          ${GS.FlexRowVerticalCenter}
          height: 17px;
          width: 50%;
          cursor: pointer;
          .name {
            width: 50px;
            font-size: 11px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .detail-button {
    width: 30px;
    background-color: ${({ isWin }) => (isWin ? '#e89c95' : '#7fb0e1')};
    border: 1px solid ${({ isWin }) => (isWin ? '#c8817c' : '#549dc7')};
  }
`;

interface IPlayerListProp {
  gameId: string;
  players: PlayerType[] | undefined;
}

const PlayerList = memo(
  ({ gameId, players }: IPlayerListProp) => {
    if (!players) return null;
    return (
      <>
        {players.map((player) => (
          <Link key={`${player.summonerId}-${gameId}`} href={`/summoners/${player.summonerName}`}>
            <div className="player">
              <Image width={16} height={16} src={player.champion.imageUrl} priority />
              <div className="name">{player.summonerName}</div>
            </div>
          </Link>
        ))}
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.gameId === nextProps.gameId;
  },
);

interface IProps {
  gameInfo: GameType;
  itemIndex: number;
}

const MatchesListItem = ({ gameInfo, itemIndex }: IProps) => {
  const { champion, gameType, isWin, gameLength, createDate, spells, peak, stats, gameId, teams } = gameInfo;
  const { kill, assist, death, cs, csPerMin, contributionForKillRate } = stats.general;
  const championKey = champion.imageUrl.split('champion/')[1].split('.png')[0];
  const players: PlayerType[] | undefined = teams && [...teams[0].players, ...teams[1].players];
  const badge = stats.general.opScoreBadge;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <MatchesListItemContainer index={itemIndex} isWin={isWin}>
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
                <TooltipIcon key={`${spell.imageUrl}-${gameId}`} imageUrl={spell.imageUrl} />
              ))}
              {peak.map((p) => (
                <TooltipIcon key={`${p}-${gameId}`} imageUrl={p} size="22px" />
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
          <div className="badges">{badge && <ScoreBadge name={badge} />}</div>
        </div>
        <div className="level-area">
          <div className="level">레벨 {champion.level}</div>
          <div className="cs">
            {cs} ({csPerMin}) CS
          </div>
          <div className="kill-engagement-rate">킬관여 {contributionForKillRate}</div>
        </div>
        <div className="item-area">
          <div className="item-ward-build">
            <div className="item-icons">
              {[...Array(6)].map((n, index) => {
                const imageUrl = gameInfo.items[index]?.imageUrl;
                const itemId = imageUrl && imageUrl.split('item/')[1].split('.png')[0];
                const tooltipId = itemId ? `${itemId}-${gameId}-${index}` : '';
                const ItemsInfoTyped = ItemsInfo as unknown as Items;
                const item = ItemsInfoTyped.data[itemId];

                if (!item) return <TooltipIcon key={`${gameId}-${itemId}-${index}`} />;

                const tooltipText = `
                  <p class="name">${item.name}</p>
                  <p class="description">${item.description}</p><br/>
                  <p>
                    가격: <span class="gold">${item.gold.total} (${item.gold.base})</span>
                  </p>
                `;

                return (
                  <TooltipIcon
                    id={tooltipId}
                    key={`${gameId}-${itemId}-${index}`}
                    imageUrl={item && imageUrl}
                    tooltipText={tooltipText}
                  />
                );
              })}
            </div>
            <div className="ward-build-icons">
              <TooltipIcon size="22px" />
              <TooltipIcon imageUrl={`/images/icon-build-${isWin ? `red` : `blue`}.png`} size="22px" />
            </div>
          </div>
          <div className="control">
            <TooltipIcon imageUrl={`/images/icon-ward-${isWin ? `red` : `blue`}.svg`} size="16px" />
            <span className="name">제어 와드 1</span>
          </div>
        </div>
        <div className="summoner-area">
          <div className="team">
            <PlayerList gameId={gameId} players={players} />
          </div>
        </div>
      </div>
      <div className="detail-button" />
    </MatchesListItemContainer>
  );
};

export default memo(MatchesListItem);
