import useScrollbarSize from 'react-scrollbar-size';
import styled from 'styled-components';
import Colors from '../../styles/Colors';
import Constants from '../../styles/Constants';
import { default as GS } from '../../styles/GeneralStyle';
import SearchBar from '../searchBar/SearchBar';

const HeaderContainer = styled.div<{ scrollbarWidth: string }>`
  background-color: ${Colors.header};
  height: 97px;
  margin-left: ${({ scrollbarWidth }) => `-${scrollbarWidth}`}; //스크롤바 때문에 생기는 왼쪽 공백 메꾸기 위해
  padding-left: ${({ scrollbarWidth }) => `${scrollbarWidth}`}; //메꾼 왼쪽 공백만큼 밀리는 헤더 공간 보정하기 위해
  overflow: hidden;

  .contents-area {
    ${GS.FlexRow}
    width: ${Constants.contentWidth};

    height: 100%;
    margin: 0 auto;
    /* margin-right: ${({ scrollbarWidth }) => `-${scrollbarWidth}`}; */
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const Header = () => {
  const { width } = useScrollbarSize();
  return (
    <HeaderContainer scrollbarWidth={`${width + 1}px`}>
      <div className="contents-area">
        <SearchBar />
      </div>
    </HeaderContainer>
  );
};
export default Header;
