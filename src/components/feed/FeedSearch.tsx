import Image from 'next/image';
import { FeedConatiner } from './styled';
import { SearchBar } from '@/src/components/shared/SearchBar';

export default function FeedSearch() {
  return (
    <FeedConatiner>
      <SearchBar placeholder="탐험하고 싶은 산을 찾아보세요" />
      {/* chip이 들어갈 공간 */}
      {/* 피드가 들어갈 공간 */}
    </FeedConatiner>
  );
}
