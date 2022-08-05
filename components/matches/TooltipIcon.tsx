import Image from 'next/image';
import { Children, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import Colors from '../../styles/Colors';

interface IStyleProps {
  imageUrl?: string;
  size?: string;
}

const TooltipContainer = styled.div<IStyleProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  .test {
    background-color: red !important;
  }
`;

const BlankContainer = styled.div<IStyleProps>`
  background-color: ${Colors.lightGray};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${Colors.lightGray};
  opacity: 0.5;
`;

interface IProps {
  id?: string;
  imageUrl?: string;
  size?: string;
  children?: string;
  tooltipText?: {
    title: string;
    content: string;
  };
}

const ToolitpIcon = ({ id, imageUrl, size, children, tooltipText }: IProps) => {
  const [tooltip, setTooltip] = useState(false);
  const toolTipId = `${id}`;

  useEffect(() => {
    setTooltip(true);
  }, []);

  return (
    <TooltipContainer
      imageUrl={imageUrl}
      size={size}
      onMouseEnter={() => {
        setTooltip(true);
      }}
      onMouseOut={() => {
        setTooltip(false);
        setTimeout(() => setTooltip(true), 100);
      }}
      data-tip=""
      data-for={toolTipId}
    >
      {imageUrl !== '' ? (
        <Image src={imageUrl!} layout="fill" objectFit="contain" priority />
      ) : (
        <BlankContainer size={size} imageUrl={imageUrl} />
      )}
      {tooltip && (
        <ReactTooltip id={toolTipId} effect="solid" multiline html>
          {tooltipText &&
            `<div style="max-width:250px">
          <div style="color:cyan;padding-bottom:20px">${tooltipText.title}</div>
          <div>${tooltipText.content}</div>
          
          </div>`}
        </ReactTooltip>
      )}
    </TooltipContainer>
  );
};

ToolitpIcon.defaultProps = {
  id: '',
  size: '22px',
  imageUrl: '',
  children: null,
  tooltipText: null,
};

export default ToolitpIcon;
