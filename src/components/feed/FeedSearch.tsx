import Image from 'next/image';
import { FeedConatiner } from './styled';
import { ReviewSelectPopover } from '@/src/components/shared/Modal';
import { SearchBar } from '@/src/components/shared/SearchBar';

export default function FeedSearch() {
  return (
    <FeedConatiner>
      <ReviewSelectPopover
        text="종류 선택하기"
        content={
          <div>
            <div>
              <span>모임 후기 작성하기</span>
              {/* <Image src="" alt="" />
            </div>
            <div>
              <p>등반 후기 작성하기</p>
              {/* <Image src="" alt="" /> */}
            </div>
          </div>
        }
      />
      <SearchBar placeholder="탐험하고 싶은 산을 찾아보세요" />
      {/* chip이 들어갈 공간 */}
      {/* 피드가 들어갈 공간 */}
    </FeedConatiner>
  );
}
