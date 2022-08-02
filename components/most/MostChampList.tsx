import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import Colors from '../../styles/Colors';
import { ChampionType, MostInfoType, MostOptionType, RecentWinRateType } from '../../types/mostInfo';

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

  return (
    <MostChampListContainer>
      {listItem.map((item, index) => {
        const key = `${index} ${item.id}`;
        return (
          <div className="list-item" key={key}>
            {item.name}
          </div>
        );
      })}
    </MostChampListContainer>
  );
};

export default MostChampList;
