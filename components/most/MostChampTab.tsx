import styled from 'styled-components';
import Colors from '../../styles/Colors';
import MostChampList from './MostChampList';
import { FlexHoriVertiCenterStyle, WidgetBoxStyle } from '../../styles/GeneralStyle';

const MostChampTabContainer = styled.div`
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
    }
    > .tab + .tab {
      border-left: 1px solid ${Colors.widgetBorder};
    }
  }
`;

const MostChampTab = () => {
  const tabNames = ['챔피언 승률', '7일간 랭크 승률'];

  return (
    <MostChampTabContainer>
      <div className="tabs-area">
        {tabNames.map((name) => (
          <div className="tab">{name}</div>
        ))}
      </div>
      <MostChampList />
    </MostChampTabContainer>
  );
};

export default MostChampTab;
