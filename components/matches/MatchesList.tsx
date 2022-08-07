import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store';
import MatchesListItem from './MatchesListItem';
import ItemsInfo from '../../public/data/item.json';
import { ItemData, Items } from '../../types/item';
import { getMatchDetail } from '../../api/summonerAPI';
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
  }, [matchOption]);

  const ItemsInfoTyped = ItemsInfo as unknown as Items;

  // 데이터에 딸려들어오는 태그를 제거하며 줄바꿈은 남겨둠
  const removeDescriptionTags = (str: string) => str.replaceAll(/(<((?!br)[^>]+)>)/gi, '');

  return (
    <MatchesListContainer>
      {games?.map((game) => {
        const items = game.items.map((item) => {
          const itemId = item.imageUrl.split('item/')[1].split('.png')[0];
          const nowItemData = ItemsInfoTyped.data[itemId];
          const TagRemovedItemData: ItemData = {
            ...nowItemData,
            description: removeDescriptionTags(nowItemData.description),
          };
          return { id: itemId, imageUrl: item.imageUrl, data: TagRemovedItemData };
        });

        return <MatchesListItem key={game.gameId} gameInfo={game} itemsInfo={items} />;
      })}
    </MatchesListContainer>
  );
};

export default MatchesList;
