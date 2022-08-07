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
  const { selected } = useAppSelector(({ summonerReducer }) => summonerReducer);
  const { matchesInfo, matchOption } = useAppSelector(({ matchesReducer }) => matchesReducer);
  const [games, setGames] = useState<GameType[] | null>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 250);
  }, []);

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

  return (
    <MatchesListContainer>
      {games &&
        show &&
        games.map((game) => {
          return <MatchesListItem key={game.gameId} gameInfo={game} />;
        })}
    </MatchesListContainer>
  );
};

export default MatchesList;
