import styled from 'styled-components';
import Image from 'next/image';
import FeedPage from '@/src/components/feeds/FeedPage';
import { SearchBar } from '@/src/components/shared/SearchBar';
import { useState } from 'react';
import { Feed, feedMockData } from '@/src/components/feeds/mock';

const FeedConatiner = styled.div`
  width: 100%;
  height: auto;
  margin: auto;
  margin-bottom: 10rem;

  /* @media (max-width: 768px) {
    min-width: 6.4rem;
  }
  @media (max-width: 480px) {
    min-width: 4.16rem;
  } */
`;

const FilteredInner = styled.div`
  margin-top: 10rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function FeedSearch() {
  const [isSearching, setIsSearching] = useState(false); // 검색 상태
  const [filteredFeeds, setFilteredFeeds] = useState<Feed[]>([]); // 피드 저장

  const handleSearch = (value: string) => {
    if (value.trim() === '') {
      setIsSearching(false);
      setFilteredFeeds([]); // 여기 고쳐보기
    } else {
      const filtered = feedMockData().filter((feed: Feed) =>
        feed.mainText.toLowerCase().includes(value.toLowerCase()),
      );
      setIsSearching(true);
      setFilteredFeeds(filtered); // 여기 고쳐보기
    }
  };
  // const [keyword, setKeyword] = useState("");
  // const filteredFeed = feeds.filter((item)=> item.name.includes(keyword))
  // Best => const filteredFeeds = useMemo(()=> feeds.filter(item)=>item.name.includes(keyword),[keyword, feeds]);
  return (
    <FeedConatiner>
      <SearchBar
        placeholder="찾고싶은 피드를 본문글로 검색해주세요 (초기화: 지우고 다시 Enter 누르기)"
        onSearch={handleSearch}
      />
      {/* chip이 들어갈 공간 */}
      {/* 피드가 들어갈 공간 */}
      <FilteredInner>
        <FeedPage feeds={isSearching ? filteredFeeds : feedMockData()} />
      </FilteredInner>
    </FeedConatiner>
  );
}
