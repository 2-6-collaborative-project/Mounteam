import React from 'react';
import { Popover } from 'antd';

interface CustomPopoverProps {
  title?: string;
  content: React.ReactNode;
  children?: React.ReactNode;
}

export const CustomPopover: React.FC<CustomPopoverProps> = ({
  title,
  content,
  children,
}) => {
  return (
    <Popover content={content} title={title}>
      {children}
    </Popover>
  );
};
