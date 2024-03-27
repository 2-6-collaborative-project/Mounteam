import { useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import feedSearchImgfrom from '@/public/feedSearch.svg';
import { colors } from '@/app/styles/colors';

interface SearchBarProps {
  placeholder: string;
}

const SearchContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-bottom: 1px solid ${colors.Grayscale[13]};
  margin: 0 auto;

  @media (max-width: 768px) {
    min-width: 6.4rem;
  }
  @media (max-width: 480px) {
    min-width: 4.16rem;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  cursor: pointer;
  width: 100%;

  & img {
    width: 2.4rem;
    height: 2.4rem;
  }

  & input {
    width: 100%;
    height: 3rem;
    border: none;
    padding-left: 1rem;

    ::placeholder {
      color: var(#8c8c8c);
      text-align: center;
      font-size: 2rem;
      font-weight: 400;
      line-height: 3.6rem;
    }
  }
`;

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
