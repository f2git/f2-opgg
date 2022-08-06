import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { default as GS } from '../../styles/GeneralStyle';
import ggLogo from '../../public/images/icon-gg.svg';
import AutocompleteModal from './AutocompleteModal';
import RecentKeywordModal from './RecentKeywordModal';
import useOutsideClick from '../../utils/UseOutsideClick';
import useDebounce from '../../utils/UseDebounce';

const SearchBarContainer = styled.div<{ modal: boolean }>`
  width: 260px;
  height: 32px;
  margin-bottom: 12px;
  .search-bar {
    ${GS.FlexRow}
    background-color: white;
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
        margin-left: 14px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
    }
    .button-area {
      width: 40px;
      cursor: pointer;
    }
  }
  .bottom-modal-area {
    position: relative;
    margin-top: 4px;
    width: 100%;
    background-color: white;
    box-shadow: rgb(0 0 0 / 50%) 0px 2px 4px 0px;
    visibility: ${({ modal }) => (modal ? 'visible' : 'hidden')};
    z-index: 1;
  }
`;

const SearchBar = () => {
  const [debouncedKeyword, keyword, setKeyword] = useDebounce<string>('', 100);
  const [bottomModal, setBottomModal] = useState(false);
  const componentREf = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const modalToggle = (focused: boolean) => {
    setBottomModal(focused);
  };

  const clearSearchBar = () => {
    setKeyword('');
    modalToggle(false);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      router.push(keyword);
      clearSearchBar();
    } else if (!bottomModal) {
      setBottomModal(true);
    }
  };

  useOutsideClick(componentREf, () => modalToggle(false));

  return (
    <SearchBarContainer ref={componentREf} modal={bottomModal}>
      <div className="search-bar">
        <div className="input-area">
          <input
            placeholder="소환사명,챔피언···"
            value={keyword}
            onChange={onChange}
            onFocus={() => modalToggle(true)}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="button-area">
          <Image src={ggLogo} width={32} height={32} priority />
        </div>
      </div>
      <div className="bottom-modal-area">
        {keyword ? (
          <AutocompleteModal keyword={debouncedKeyword} onClick={() => clearSearchBar()} />
        ) : (
          <RecentKeywordModal />
        )}
      </div>
    </SearchBarContainer>
  );
};

export default SearchBar;
