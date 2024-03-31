import { ConfigProvider, Popover } from 'antd';
import { createGlobalStyle } from 'styled-components';
import { colors } from '@/app/styles/colors';

const GlobalStyle = createGlobalStyle`
  .custom-popover-class .ant-popover-inner {
    padding: 0 !important;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15) !important;
  }
  a:hover{
    color: ${colors.Primary[500]} !important;
  }
`;

interface CustomPopoverProps {
  title?: string;
  content: React.ReactNode;
  children?: React.ReactNode;
}

export const HeaderPopover: React.FC<CustomPopoverProps> = ({
  title,
  content,
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontWeightStrong: 600,
          borderRadiusLG: 1.25,
        },
      }}
    >
      <GlobalStyle />
      <Popover
        content={content}
        title={title}
        overlayClassName="custom-popover-class"
      >
        {children}
      </Popover>
    </ConfigProvider>
  );
};
