import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { default as GS } from '../../styles/GeneralStyle';
import Colors from '../../styles/Colors';
import useLocalStorage from '../../utils/useLocalStorage';
import { HistoryType } from '../../types/summoner';

const RecentKeywordModalContainer = styled.div<{ tab: number }>`
  .tabs {
    ${GS.FlexRowVerticalCenter}
    height:40px;
    font-size: 14px;
    color: ${Colors.lightGray};
    background-color: ${Colors.moreLightGray};
    > div {
      ${GS.FlexHorizontalVertiCalenterStyle}
      height:100%;
      flex: 1;
      cursor: pointer;
      :nth-child(${({ tab }) => tab}) {
        background-color: white;
        color: ${Colors.almostBlack};
      }
    }
  }
  .noHistory {
    ${GS.FlexHorizontalVertiCalenterStyle}
    color:${Colors.lightGray};
    text-align: center;
    font-size: 12px;

    height: 100px;
  }
`;

const HistoryItemContainer = styled.div<{ tab: number; name: string; isFavorite: boolean }>`
  ${GS.FlexRowVerticalCenter}
  padding:10px;
  height: 40px;
  font-size: 13px;
  display: ${({ tab, isFavorite }) => (tab === 2 && !isFavorite ? 'none' : 'flex')};
  cursor: pointer;
  .name {
    flex: 1;
  }
  .favorite,
  .remove {
    color: ${Colors.moreLightGray};
    width: 15px;
    cursor: pointer;
  }
  .favorite {
    display: ${({ tab }) => (tab === 2 ? 'none' : 'block')};
    color: ${({ isFavorite }) => (isFavorite ? Colors.blue : Colors.moreLightGray)};
  }
  .remove {
    margin-left: 10px;
  }
`;

const RecentKeywordModal = ({ onClick }: { onClick: () => void }) => {
  const [history, setHistory] = useLocalStorage('history', []);
  const [bookMarks, setBookMarks] = useState([]);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    // if (historyLocal) {
    //   const sortedHistory = historyLocal.sort((a: HistoryType, b: HistoryType) => b.time - a.time);
    //   setHistory(sortedHistory);

    setBookMarks(history.filter((v: HistoryType) => v.isFavorite));

    // console.log(history);
    // }
  }, [history]);

  const deleteHistory = (name: string) => {
    setHistory(history.filter((item: HistoryType) => item.name !== name));
  };
  const favoriteHistory = (indexToUpdate: number) => {
    setHistory(
      history.map((item: HistoryType, index: number) =>
        index === indexToUpdate ? { ...item, isFavorite: !item.isFavorite } : item,
      ),
    );
  };

  return (
    <RecentKeywordModalContainer tab={tab}>
      <div className="tabs">
        <div onClick={() => setTab(1)}>최근 검색</div>
        <div onClick={() => setTab(2)}>즐겨 찾기</div>
      </div>

      {(history && tab === 1 && history.length > 0) || (tab === 2 && bookMarks.length > 0) ? (
        <div className="history">
          {history
            .sort((a: HistoryType, b: HistoryType) => b.time - a.time)
            .map(({ name, isFavorite }: HistoryType, index: number) => (
              <HistoryItemContainer key={name} tab={tab} name={name} isFavorite={isFavorite}>
                <Link href={name} passHref>
                  <div className="name" onClick={() => onClick()}>
                    {name}
                  </div>
                </Link>
                <div className="favorite" onClick={() => favoriteHistory(index)}>
                  ★
                </div>
                <div className="remove" onClick={() => deleteHistory(name)}>
                  X
                </div>
              </HistoryItemContainer>
            ))}
        </div>
      ) : (
        <div className="noHistory">
          {tab === 1 ? '최근에 본 소환사가 없습니다.' : '관심있는 소환사에 즐겨찾기를 하여 편리하게 정보를 받아보세요'}
        </div>
      )}
    </RecentKeywordModalContainer>
  );
};

export default RecentKeywordModal;
