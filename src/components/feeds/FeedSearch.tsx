import Image from 'next/image';
import styled from 'styled-components';
import { SearchBar } from '@/src/components/shared/SearchBar';

const FeedConatiner = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 10rem;

  @media (max-width: 768px) {
    min-width: 6.4rem;
  }
  @media (max-width: 480px) {
    min-width: 4.16rem;
  }
`;

export default function FeedSearch() {
  return (
    <FeedConatiner>
      <SearchBar placeholder="탐험하고 싶은 산을 찾아보세요" />
      {/* chip이 들어갈 공간 */}
      {/* 피드가 들어갈 공간 */}
    </FeedConatiner>
  );
}
