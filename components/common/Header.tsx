import styled from 'styled-components';
import Colors from '../../styles/Colors';
import Constants from '../../styles/Constants';
import { default as GS } from '../../styles/GeneralStyle';
import SearchBar from '../searchBar/SearchBar';

const HeaderContainer = styled.div`
  background-color: ${Colors.header};
  height: 97px;
  .contents-area {
    ${GS.FlexRow}
    width: ${Constants.contentWidth};
    height: 100%;
    margin: 0 auto;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const Header = () => (
  <HeaderContainer>
    <div className="contents-area">
      <SearchBar />
    </div>
  </HeaderContainer>
);
export default Header;
