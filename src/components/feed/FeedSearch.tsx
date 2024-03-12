import Image from 'next/image';
import { PlaceholderWrapper, SearchContainer, SearchWrapper } from './styled';
import { ReviewSelectPopover } from '../shared/Modal';

export default function FeedSearch() {
  return (
    <SearchContainer>
      <SearchWrapper>
        <Image
          src={'@/public/feedSearch.svg'}
          alt="검색 돋보기 이미지"
          fill
        ></Image>
      </SearchWrapper>
      <PlaceholderWrapper>
        <ReviewSelectPopover
          text="종류 선택하기"
          content={
            <div>
              <p>모임 후기 작성하기</p>
              <p>등반 후기 작성하기</p>
            </div>
          }
        />
      </PlaceholderWrapper>
    </SearchContainer>
  );
}
