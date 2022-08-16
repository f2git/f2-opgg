import Image from 'next/image';
import { useEffect, useState, memo } from 'react';
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
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  .tooltip-text {
    font-size: 11px;
    max-width: 230px;
  }

  .name {
    color: cyan;
  }
  .gold {
    color: gold;
  }
`;

const BlankContainer = styled.div<IStyleProps>`
  background-color: ${Colors.lightGray};
  border-radius: 3px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${Colors.lightGray};
  opacity: 0.3;
`;

interface IProps {
  id?: string;
  imageUrl?: string;
  size?: string;
  children?: string;
  title?: string;
  tooltipText?: string;
}
const ToolitpIcon = ({ id, imageUrl, size, tooltipText }: IProps) => {
  const [tooltip, setTooltip] = useState(false);
  const toolTipId = `${id}`;

  useEffect(() => {
    setTooltip(true);
  }, []);

  if (!imageUrl) return <BlankContainer size={size} />;

  return (
    <TooltipContainer imageUrl={imageUrl} size={size} data-tip="" data-for={toolTipId}>
      {toolTipId && tooltip && (
        <div
          onMouseEnter={() => {
            setTooltip(true);
          }}
          onMouseOut={() => {
            setTooltip(false);
            setTimeout(() => setTooltip(true), 100);
          }}
          onBlur={() => {
            setTooltip(false);
            setTimeout(() => setTooltip(true), 100);
          }}
        >
          <ReactTooltip id={toolTipId} effect="solid" multiline html>
            {`<div class="tooltip-text">
            ${tooltipText}
            </div>`}
          </ReactTooltip>
        </div>
      )}
      <Image src={imageUrl} layout="fill" objectFit="contain" priority />
    </TooltipContainer>
  );
};

ToolitpIcon.defaultProps = {
  id: '',
  size: '22px',
  imageUrl: null,
  children: null,
  title: null,
  tooltipText: null,
};

export default memo(ToolitpIcon);
