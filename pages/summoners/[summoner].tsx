import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MatchesList from '../../components/matches/MatchesList';
import MatchesSummary from '../../components/matches/MatchesSummary';
import MatchesTap from '../../components/matches/MatchesTab';
import MostChampTab from '../../components/most/MostChampTab';
import Profile from '../../components/profile/Profile';
import RankCard from '../../components/rank/RankCard';

import { useAppSelector, wrapper } from '../../store';
import { fetchMatchesInfoByName } from '../../store/matchesSlice';
import { fetchMostInfoByName } from '../../store/mostSlice';
import { fetchSummonerBaseInfoByName } from '../../store/summonerSlice';
import Constants from '../../styles/Constants';
import useLocalStorage from '../../utils/useLocalStorage';

import { HistoryType } from '../../types/summoner';

const SummonerPageContainer = styled.div`
  .summoner-profile-area {
    height: 175px;
    border-bottom: 1px solid #d8d8d8;
  }
  .summoner-details-area {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    .details-left-area {
      width: 300px;
      > * + * {
        margin-top: 8px;
      }
    }
    .details-main-area {
      flex: 1;
      margin-left: 10px;
    }
  }
  .contents-area {
    width: ${Constants.contentWidth};
    height: 100%;
    margin: 0 auto;
  }
`;

const SummonerPage = ({ name }: { name: string }) => {
  const selectedSummoner = useAppSelector((state) => state.summonerReducer.selected);
  const [history, setHistory] = useLocalStorage('history', []);

  useEffect(() => {
    if (selectedSummoner) {
      const newHistory = {
        name: selectedSummoner.name,
        time: Date.now(),
        isFavorite: false,
      };
      if (history.length <= 0) {
        setHistory([newHistory]);
      } else {
        setHistory([...history.filter((v: HistoryType) => v.name !== selectedSummoner.name), newHistory]);
      }
    }
  }, [selectedSummoner]);

  return (
    selectedSummoner && (
      <SummonerPageContainer>
        <div className="summoner-profile-area">
          <div className="contents-area">
            <Profile />
          </div>
        </div>
        <div className="summoner-details-area contents-area">
          <div className="details-left-area">
            <RankCard mode="solo" />
            <RankCard mode="free" />
            <MostChampTab />
          </div>
          <div className="details-main-area">
            <MatchesTap />
            <MatchesSummary />
            <MatchesList />
          </div>
        </div>
      </SummonerPageContainer>
    )
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { summoner: '플레이어아이디' } }],
    fallback: true, // false면 위 이외는 전부 404
  };
};

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params }) => {
  const name = params!.summoner;

  await store.dispatch(fetchSummonerBaseInfoByName(name as string));
  await store.dispatch(fetchMostInfoByName());
  await store.dispatch(fetchMatchesInfoByName());

  return {
    props: {
      name,
    },
    revalidate: 1,
  };
});

export default SummonerPage;
