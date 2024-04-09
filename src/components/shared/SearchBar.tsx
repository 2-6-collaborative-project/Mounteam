import { useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import feedSearchImgfrom from '@/public/feedSearch.svg';
import { colors } from '@/app/styles/colors';
import { Input } from 'antd';

interface SearchBarProps {
  placeholder: string;
  onSearch: (value: string, feedDatas?: any) => void;
}

const SearchContainer = styled.div`
  padding: 0 0.8rem;
  border-bottom: 1px solid ${colors.Grayscale[13]};
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
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
  cursor: pointer;
  width: 100%;
  gap: 0.3rem;
  padding-bottom: 0.4rem;
  padding-left: 0.8rem;

  & img {
    width: 20px;
    height: 20px;
  }

  & input {
    width: 100%;
    height: 3rem;
    border: none;
    padding-left: 0.8rem;

    ::placeholder {
      color: #8c8c8c;
      text-align: left;
      font-size: 2rem;
      font-weight: 400;
      line-height: 3.6rem;
    }
  }
`;

/* SearchContainer 클릭시 input창으로 자동 포커스가게 하기
   1.ref변수 만든후 input에 Ref등록 2. handleClick 추가 3. onClick추가
  */

export const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const [value, setValue] = useState(''); // 입력값 상태 관리

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <Image src={feedSearchImgfrom} alt="검색 돋보기 이미지" />
        <Input
          variant="borderless"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchWrapper>
    </SearchContainer>
  );
};
