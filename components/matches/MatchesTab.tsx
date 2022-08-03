import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { WidgetBoxStyle, FlexHoriVertiCenterStyle } from '../../styles/GeneralStyle';
import { selectMatchOption } from '../../store/matchesSlice';
import { MatchOptionType } from '../../types/matches';

import Colors from '../../styles/Colors';

interface IProps {
  selectedTab: number;
}

const MatchesTabContainer = styled.div<IProps>`
  ${WidgetBoxStyle}
  height: 36px;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: bold;
  color: ${Colors.moreAlmostBlack};
  .Tab {
    ${FlexHoriVertiCenterStyle}
    height: 100%;
    margin-left: 16px;
    margin-right: 16px;
    cursor: pointer;
    :nth-child(${(props) => props.selectedTab}) {
      color: ${Colors.mainBlue};
      border-bottom: 2px solid ${Colors.mainBlue};
    }
  }
  border-bottom: 1px solid ${Colors.widgetBorder};
`;

const MatchesTab = () => {
  const tabNames = ['전체', '솔로게임', '자유랭크'];

  const dispatch = useAppDispatch();
  const matchOption = useAppSelector(({ matchesReducer }) => matchesReducer.matchOption);
  const selectedTabNo = tabNames.indexOf(matchOption) + 1;

  return (
    <MatchesTabContainer selectedTab={selectedTabNo}>
      {tabNames.map((name) => (
        <div
          className="Tab"
          key={name}
          onClick={() => {
            dispatch(selectMatchOption(name as MatchOptionType));
          }}
        >
          {name}
        </div>
      ))}
    </MatchesTabContainer>
  );
};

export default MatchesTab;
