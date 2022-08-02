import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import Colors from '../../styles/Colors';
import { ChampionType, MostInfoType, MostOptionType, RecentWinRateType } from '../../types/mostInfo';
import ChampAvatar from '../common/ChampAvatar';

const MostChampListContainer = styled.div`
  background-color: ${Colors.background};

  .list-item {
    height: 53px;
    display: flex;
    align-items: center;
  }
  .list-item + .list-item {
    border-top: 1px solid #ccc;
  }
`;

interface IProps {
  mostOption: MostOptionType;
  mostInfo: MostInfoType;
}

const MostChampList = ({ mostOption, mostInfo }: IProps) => {
  const { champions, recentWinRate } = mostInfo!;
  const listItem: ChampionType[] | RecentWinRateType[] = mostOption === '챔피언 승률' ? champions : recentWinRate;

  console.log(champions);

  return (
    <MostChampListContainer>
      {listItem.map((item, index) => {
        const key = `${index}-${item.id}-${mostOption}`; // API 데이터에 key, id, name 등이 중복된 경우가 있어 부득이 index 사용
        return (
          <div className="list-item" key={key}>
            <ChampAvatar imageUrl={item.imageUrl} champName={item.key} size="45px" />
            {/* {item.name} */}
          </div>
        );
      })}
    </MostChampListContainer>
  );
};

export default MostChampList;
