import { Popover } from 'antd';
import Image from 'next/image';

export const ReviewSelectPopover = ({
  text,
  content,
}: {
  text: string;
  content: JSX.Element;
}) => {
  return (
    <>
      <Popover placement="bottomRight" title={text} content={content}>
        예시
      </Popover>
    </>
  );
};
