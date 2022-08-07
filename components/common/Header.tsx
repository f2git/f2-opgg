import useScrollbarSize from 'react-scrollbar-size';
import styled from 'styled-components';
import Colors from '../../styles/Colors';
import Constants from '../../styles/Constants';
import { default as GS } from '../../styles/GeneralStyle';
import SearchBar from '../searchBar/SearchBar';

const HeaderContainer = styled.div<{ scrollbarWidth: string }>`
  background-color: ${Colors.header};
  height: 97px;
  position: relative;

  .contents-area {
    ${GS.FlexRow}
    width: ${Constants.contentWidth};
    height: 100%;
    margin: 0 auto;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .test {
    background-color: ${Colors.header};
    width: ${({ scrollbarWidth }) => scrollbarWidth};
    height: 100%;
    top: 0px;
    /* left: 15px; */
    left: ${({ scrollbarWidth }) => `-${scrollbarWidth}`};
    position: absolute;
  }
`;

const Header = () => {
  const { height, width } = useScrollbarSize();

  return (
    <HeaderContainer scrollbarWidth={`${width + 1}px`}>
      <div className="contents-area">
        <SearchBar />
      </div>
      <div className="test" />
    </HeaderContainer>
  );
};
export default Header;
