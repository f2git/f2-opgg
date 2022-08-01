import styled from 'styled-components';
import Colors from '../../styles/Colors';
import Constants from '../../styles/Constants';

const HeaderContainer = styled.div`
  background-color: ${Colors.header};
  height: 97px;
  .contents-area {
    width: ${Constants.contentWidth};
    height: 100%;
    margin: 0 auto;
    background-color: green;
  }
`;

const Header = () => (
  <HeaderContainer>
    <div className="contents-area">header</div>
  </HeaderContainer>
);
export default Header;
