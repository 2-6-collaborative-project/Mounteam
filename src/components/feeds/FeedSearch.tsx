import styled from 'styled-components';
import Image from 'next/image';
import FeedPage from '@/src/components/feeds/FeedPage';
import { SearchBar } from '@/src/components/shared/SearchBar';
import { useState } from 'react';
import { Feed, feedMockData } from '@/src/components/feeds/mock';
import FeedData from '@/src/types/feeds/FeedData';
interface FeedSearchProps {
  feedData?: FeedData[][];
  observerTarget: React.RefObject<HTMLDivElement>;
}

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

export default function FeedSearch({
  feedData = [],
  observerTarget,
}: FeedSearchProps) {
  const [isSearching, setIsSearching] = useState(false); // 검색 상태
  const [filteredFeeds, setFilteredFeeds] = useState<FeedData[][]>([]); // 피드 저장
  console.log('필터페이지 피드데이터', feedData);

  const handleSearch = (value: string) => {
    if (value.trim() === '') {
      setIsSearching(false);
      setFilteredFeeds([]);
    } else {
      const lowerCaseValue = value.toLowerCase();

      const filtered =
        feedData[0]?.filter((feed: FeedData) =>
          feed.mainText.toLowerCase().includes(lowerCaseValue),
        ) ?? [];
      // console.log('필터드', filtered);

      const filteredMap = [];
      filteredMap.push(filtered);

      setIsSearching(true);
      setFilteredFeeds(filteredMap);
    }
  };
  // const [keyword, setKeyword] = useState("");
  // const filteredFeed = feeds.filter((item)=> item.name.includes(keyword))
  // Best => const filteredFeeds = useMemo(()=> feeds.filter(item)=>item.name.includes(keyword),[keyword, feeds]);
  return (
    <FeedConatiner>
      <SearchBar placeholder="" onSearch={handleSearch} />
      {/* chip이 들어갈 공간 */}
      {/* 피드가 들어갈 공간 */}
      <FilteredInner>
        <FeedPage
          feedData={isSearching ? filteredFeeds : feedData || []}
          observerTarget={observerTarget}
        />
      </FilteredInner>
    </FeedConatiner>
  );
}
