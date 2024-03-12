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
        <div style={{ width: '1rem', height: '1rem' }}>
          <Image src={'@/public/fillout.svg'} alt="fillout" layout="fill" />
        </div>
      </Popover>
    </>
  );
};
