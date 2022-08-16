import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store';
import MatchesListItem from './MatchesListItem';
import { GameType } from '../../types/matches';

const MatchesListContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  > * + * {
    margin-top: 8px;
  }
`;

const MatchesList = () => {
  const { matchesInfo, matchOption } = useAppSelector(({ matchesReducer }) => matchesReducer);
  const [games, setGames] = useState<GameType[] | null>(null);

  useEffect(() => {
    if (matchesInfo)
      setGames(
        matchesInfo.games.filter((game) => {
          if (matchOption === '전체') return true;
          if (matchOption === '솔로게임' && game.gameType === '솔랭') return true;
          if (matchOption === '자유랭크' && game.gameType === '자유 5:5 랭크') return true;
          return false;
        }),
      );
  }, [matchesInfo, matchOption]);

  if (!games) return null;

  return (
    <MatchesListContainer>
      {games.map((game, index) => {
        return (
          <MatchesListItem
            key={`GameRecord_${game.summonerId}_${game.createDate}_${index}_${matchOption}`}
            // key={`GameRecord_${game.summonerId}_${game.createDate}`}
            itemIndex={index}
            gameInfo={game}
          />
        );
      })}
    </MatchesListContainer>
  );
};

export default MatchesList;
