import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSummonerNames } from '../../api/summonerAPI';
import { AutocompleteSummonerType } from '../../types/summoner';
import useDebounce from '../../utils/UseDebounce';

const AutocompleteModalContainer = styled.div`
  .list-item {
    height: 50px;
    width: 100%;
  }
`;

const AutocompleteModal = ({ keyword }: { keyword: string }) => {
  const [summoners, setSummoners] = useState<AutocompleteSummonerType[]>([]);

  useEffect(() => {
    async function fetchAndSetSummoners() {
      const data: AutocompleteSummonerType[] = await (await getSummonerNames(keyword)).data.data;

      setSummoners(data);
    }
    fetchAndSetSummoners();
  }, [keyword]);

  return (
    <AutocompleteModalContainer>
      {summoners.map((summoner) => (
        <Link href={`/summoners/${summoner.name}`} key={summoner.id}>
          <a>
            <div className="list-item">{summoner.name}</div>
          </a>
        </Link>
      ))}
    </AutocompleteModalContainer>
  );
};

export default AutocompleteModal;
