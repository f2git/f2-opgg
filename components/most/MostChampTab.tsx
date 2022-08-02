import styled from 'styled-components';
import Colors from '../../styles/Colors';
import MostChampList from './MostChampList';
import { FlexHoriVertiCenterStyle, WidgetBoxStyle } from '../../styles/GeneralStyle';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectMostOption } from '../../store/mostSlice';
import { MostOptionType } from '../../types/mostInfo';

const MostChampTabContainer = styled.div<{ selectedTab: number }>`
  ${WidgetBoxStyle}
  .tabs-area {
    height: 44px;
    display: flex;
    cursor: pointer;
    .tab {
      ${FlexHoriVertiCenterStyle}
      flex:1;
      border-bottom: 1px solid ${Colors.widgetBorder};
      font-size: 12px;
      color: ${Colors.normalGray};
      :nth-child(${({ selectedTab }) => selectedTab}) {
        background-color: ${Colors.background};
        border-bottom: none;
        color: ${Colors.almostBlackPlusFewRed};
        font-weight: bold;
      }
    }
    > .tab + .tab {
      border-left: 1px solid ${Colors.widgetBorder};
    }
  }
`;

const MostChampTab = () => {
  const tabNames: MostOptionType[] = ['챔피언 승률', '7일간 랭크 승률'];
  const dispatch = useAppDispatch();
  const mostOption = useAppSelector(({ mostReducer }) => mostReducer.MostOption);
  const selectedTabNo = tabNames.indexOf(mostOption) + 1;

  return (
    <MostChampTabContainer selectedTab={selectedTabNo}>
      <div className="tabs-area">
        {tabNames.map((name) => (
          <div
            className="tab"
            key={name}
            onClick={() => {
              dispatch(selectMostOption(name));
            }}
          >
            {name}
          </div>
        ))}
      </div>
      <MostChampList />
    </MostChampTabContainer>
  );
};

export default MostChampTab;
