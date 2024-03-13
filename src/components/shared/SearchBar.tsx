import Image from 'next/image';
import feedSearchImgfrom from '@/public/feedSearch.svg';
import { SearchContainer, SearchWrapper } from '@/src/components/feed/styled';
import { useRef } from 'react';

interface SearchBarProps {
  placeholder: string;
}

export const SearchBar = ({ placeholder }: SearchBarProps) => {
  /* SearchContainer 클릭시 input창으로 자동 포커스가게 하기
   1.ref변수 만든후 input에 Ref등록 2. handleClick 추가 3. onClick추가
  */
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <SearchContainer onClick={handleClick}>
      <SearchWrapper>
        <Image src={feedSearchImgfrom} alt="검색 돋보기 이미지" />
        <input placeholder={placeholder} ref={inputRef} />
      </SearchWrapper>
    </SearchContainer>
  );
};
