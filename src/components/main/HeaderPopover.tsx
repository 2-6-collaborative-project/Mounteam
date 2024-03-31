import { Popover } from 'antd';
import { colors } from '@/app/styles/colors';
import styled from 'styled-components';
import typography from '@/app/styles/typography';

interface CustomPopoverProps {
  title?: string;
  content: React.ReactNode;
  children?: React.ReactNode;
}

const PopoverParagraph = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  background: ${colors.Grayscale[1]};
  box-shadow: 0px -1px 0px 0px ${colors.Grayscale[4]} inset;
  color: ${colors.Grayscale[13]};
  ${typography.Footnote14};
`;

export const HeaderPopover: React.FC<CustomPopoverProps> = ({
  title,
  content,
  children,
}) => {
  return (
    <Popover content={content} title={title}>
      <PopoverParagraph>{children}</PopoverParagraph>
    </Popover>
  );
};
