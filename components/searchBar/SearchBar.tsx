import Image from 'next/image';
import styled from 'styled-components';
import { default as GS } from '../../styles/GeneralStyle';
import ggLogo from '../../public/images/icon-gg.svg';

const SearchBarContainer = styled.div`
  ${GS.FlexRow}
  width: 260px;
  height: 32px;
  background-color: white;
  margin-bottom: 12px;
  border-radius: 2px;
  flex-direction: row;
  .input-area {
    ${GS.FlexRowVerticalCenter}
    flex:1;
    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding-left: 14px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .button-area {
    width: 40px;
  }
`;

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <div className="input-area">
        <input placeholder="소환사명,챔피언···" />
      </div>
      <div className="button-area">
        <Image src={ggLogo} width={32} height={32} />
      </div>
    </SearchBarContainer>
  );
};

export default SearchBar;
