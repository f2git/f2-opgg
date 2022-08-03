import { css } from 'styled-components';
import Colors from './Colors';

export const WidgetBoxStyle = css`
  background-color: ${Colors.widget};
  border: 1px solid ${Colors.widgetBorder};
  border-radius: 2px;
`;
export const FlexHorizontalVertiCalenterStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FlexRow = css`
  display: flex;
  flex-direction: Row;
`;

export const FlexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const FlexRowVerticalCenter = css`
  ${FlexRow}
  align-items: center;
`;
export const FlexRowHorizontalCenter = css`
  ${FlexRow}
  justify-content: center;
`;
export const FlexColumnVerticalCenter = css`
  ${FlexColumn}
  justify-content: center;
`;
export const FlexColumnHorizontalCenter = css`
  ${FlexColumn}
  align-items: center;
`;

export default {
  FlexRow,
  FlexColumn,
  FlexRowVerticalCenter,
  FlexRowHorizontalCenter,
  FlexColumnVerticalCenter,
  FlexColumnHorizontalCenter,
  FlexHorizontalVertiCalenterStyle,
};
