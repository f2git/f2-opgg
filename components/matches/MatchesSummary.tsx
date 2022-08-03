import styled from 'styled-components';

const MatcheSummaryContainer = styled.div`
  height: 150px;
  background-color: #ededed;
  border: 1px solid #ccc;
  display: flex;
  > div {
    display: flex;
    align-items: center;
  }
  > div + div {
    border-left: 1px solid #ccc;
  }
  .chart-container {
    width: 280px;
    .pie-chart {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .chart {
        width: 100px;
        height: 100px;
        display: flex;
        background-color: blue;
        justify-content: center;
        align-items: center;
      }
      .description {
      }
    }
    .detail {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;
    }
  }
  .champ-container {
    width: 230px;
  }
  .position-container {
    flex: 1;
  }
`;

const MatchesSummary = () => {
  return (
    <MatcheSummaryContainer>
      <div className="chart-container">
        <div className="pie-chart">
          <div className="description">20전 9승 11패</div>
          <div className="chart">2</div>
        </div>
        <div className="detail">
          <div>5.8/4.6/8.0</div>
          <div>3.1(50%)</div>
        </div>
      </div>
      <div className="champ-container">2</div>
      <div className="position-container">3</div>
    </MatcheSummaryContainer>
  );
};

export default MatchesSummary;
