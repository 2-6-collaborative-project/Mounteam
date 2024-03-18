import { Popover } from 'antd';
import Image from 'next/image';
import React, { useRef } from 'react';

export const SelectPopover = ({
  text,
  content,
}: {
  text?: string;
  content: JSX.Element;
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Popover
        ref={popoverRef}
        placement="bottomRight"
        title={text}
        content={content}
      />
    </>
  );
};
