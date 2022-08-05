import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store';
import MatchesListItem from './MatchesListItem';
import ItemsInfo from '../../public/data/item.json';
import { ItemData, Items } from '../../types/item';

const MatchesListContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  > * + * {
    margin-top: 8px;
  }
`;

const MatchesList = () => {
  const { matchesInfo, matchOption } = useAppSelector(({ matchesReducer }) => matchesReducer);
  const { games } = matchesInfo!;

  const filteredGames = games.filter((game) => {
    if (matchOption === '전체') return true;
    if (matchOption === '솔로게임' && game.gameType === '솔랭') return true;
    if (matchOption === '자유랭크' && game.gameType === '자유 5:5 랭크') return true;
    return false;
  });

  const ItemsInfoTyped = ItemsInfo as unknown as Items;

  // 데이터에 딸려들어오는 태그를 제거하면서 줄바꿈은 남겨두기 위해 br 태그 먼저 처리 한뒤 제거
  const removeDescriptionTags = (str: string) => str.replaceAll('<br>', '<br/>').replaceAll(/(<((?!br)[^>]+)>)/gi, '');

  return (
    <MatchesListContainer>
      {filteredGames.map((game) => {
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
