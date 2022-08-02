import styled from 'styled-components';
import MostTab from './MostChampTab';
import MostList from './MostChampList';

const MostChampContainer = styled.div``;

const MostChamp = () => {
  return (
    <MostChampContainer>
      <MostTab />
      <MostList />
    </MostChampContainer>
  );
};

export default MostChamp;
