import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';
import Constants from '../../styles/Constants';

const SummonerPageContainer = styled.div`
  .summoner-profile-area {
    height: 175px;
    background-color: orange;
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

  .test-card {
    width: 100%;
    background-color: pink;
    height: 150px;
    border-radius: 2px;
  }
`;

const SummonerPage = ({ name }: { name: string }) => {
  return (
    <SummonerPageContainer>
      <div className="summoner-profile-area">
        <div className="contents-area">{name}</div>
      </div>
      <div className="summoner-details-area contents-area">
        <div className="details-left-area">
          <div className="test-card">1</div>
          <div className="test-card">2</div>
          <div className="test-card">2</div>
        </div>
        <div className="details-main-area">
          <div className="test-card">4</div>
        </div>
      </div>
    </SummonerPageContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { summoner: '플레이어아이디' } }],
    fallback: true, // false면 위 이외는 전부 404
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params?.summoner;

  return {
    props: {
      name,
    },
    revalidate: 20,
  };
};

export default SummonerPage;
