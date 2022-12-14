import { memo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface IProps {
  champKey: string;
  imageUrl: string;
  size: string;
}

const ChampAvatarContainer = styled.div<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: ${(props) => props.size};
  overflow: hidden;
  cursor: pointer;
  position: relative;
  a > div {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const ChampAvatar = ({ champKey: champName, imageUrl, size }: IProps) => {
  const avatarLink = `https://www.op.gg/champions/${champName.replace(' ', '')}`; //  Twisted Fate 같이 띄어쓰기 있는 경우 방지
  const imageUrlHTTPS = `https://${imageUrl.split('//')[1]}`;

  return (
    <ChampAvatarContainer size={size}>
      <a target="blank" href={avatarLink}>
        <div>
          <Image src={imageUrlHTTPS} layout="fill" objectFit="contain" priority />
        </div>
      </a>
    </ChampAvatarContainer>
  );
};

export default memo(ChampAvatar);
