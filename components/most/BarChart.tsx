import styled from 'styled-components';

interface IProps {
  wins: number;
  losses: number;
}
const ChartContainer = styled.div<IProps>`
  flex: 1;
  height: 24px;
  display: flex;
  flex-direction: row;
  .wins,
  .losses {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .count {
    color: white;
    font-weight: bold;
    font-size: 12px;
    position: absolute;
    padding: 5px;
  }
  .wins {
    flex: ${({ wins, losses }) => wins / (wins + losses)};
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: #1f8ecd;
    justify-content: flex-start;
  }
  .losses {
    flex: ${({ wins, losses }) => losses / (wins + losses)};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #ee5a52;
    justify-content: flex-end;
  }
`;

const BarChart = ({ wins, losses }: IProps) => (
  <ChartContainer wins={wins} losses={losses}>
    <div className="wins">{wins > 0 && <div className="count">{wins}승</div>}</div>
    <div className="losses">{losses > 0 && <div className="count">{losses}패</div>}</div>
  </ChartContainer>
);
export default BarChart;
