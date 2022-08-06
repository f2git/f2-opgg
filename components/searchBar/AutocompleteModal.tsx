/* eslint-disable camelcase */ // api에서 오는 데이터의 구조분해 할당을 위해서
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSummonerNames } from '../../api/summonerAPI';
import { AutocompleteSummonerType } from '../../types/summoner';
import { default as GS } from '../../styles/GeneralStyle';
import Colors from '../../styles/Colors';

const AutocompleteModalContainer = styled.div`
  .list-item {
    ${GS.FlexRowVerticalCenter}
    height: 53px;
    width: 100%;
    cursor: pointer;
    :hover {
      background-color: #def;
    }

    .profile-image {
      margin: 16px;
      position: relative;
      width: 36px;
      height: 36px;
      border-radius: 18px;
      overflow: hidden;
      background-color: black;
    }
    .summoner-information {
      ${GS.FlexColumnVerticalCenter}
      height:100%;
      flex: 1;
      font-size: 14px;
      .tier {
        font-size: 13px;
        margin-top: 4px;
        color: ${Colors.lightGray};
      }
    }
  }
  .highLight {
    color: red;
    font-weight: bold;
  }
`;

interface IProps {
  keyword: string;
  onClick: () => void;
}

const AutocompleteModal = ({ keyword, onClick }: IProps) => {
  const [summoners, setSummoners] = useState<AutocompleteSummonerType[]>([]);

  useEffect(() => {
    async function fetchAndSetSummoners() {
      const data: AutocompleteSummonerType[] = await (await getSummonerNames(keyword)).data.data;
      setSummoners(data.filter((v, i) => i < 4));
    }
    fetchAndSetSummoners();
  }, [keyword]);

  const highlightName = (hightLight: string, name: string) => {
    const splittedName = name.split(hightLight);
    if (splittedName.length <= 1) return name;
    return (
      <>
        {splittedName.length >= 3 && splittedName[0]}
        <span className="highLight">{hightLight}</span>
        {splittedName.length >= 3 ? splittedName[2] : splittedName[1]}
      </>
    );
  };

  return (
    summoners && (
      <AutocompleteModalContainer>
        {summoners.map((summoner) => {
          const { profile_image_url, name, solo_tier_info, level } = summoner;
          return (
            <Link key={name} href={`/summoners/${name}`}>
              <div className="list-item" onClick={onClick}>
                <div className="profile-image">
                  {profile_image_url && <Image layout="fill" src={profile_image_url} priority />}
                </div>
                <div className="summoner-information">
                  <div className="name">{highlightName(keyword, name)}</div>
                  <div className="tier">
                    {solo_tier_info ? `${solo_tier_info.tier} - ${solo_tier_info.lp} LP` : `Level ${level}`}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </AutocompleteModalContainer>
    )
  );
};

export default AutocompleteModal;
