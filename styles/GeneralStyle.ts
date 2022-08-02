import { css } from 'styled-components';
import Colors from './Colors';

const WidgetBoxStyle = css`
  background-color: ${Colors.widget};
  border: 1px solid ${Colors.widgetBorder};
  border-radius: 2px;
`;

const TestStyle = css`
  background-color: red;
`;

export { WidgetBoxStyle, TestStyle };
