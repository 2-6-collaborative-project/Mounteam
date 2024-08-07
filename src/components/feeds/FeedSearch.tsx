import styled from 'styled-components';
import FeedPage from '@/src/components/feeds/FeedPage';
import { SearchBar } from '@/src/components/shared/SearchBar';
import { useState, useMemo } from 'react';
import FeedData from '@/src/types/feeds/FeedData';

interface FeedSearchProps {
  feedData: FeedData[];
  fetchNextPage: () => void;
}

const FeedContainer = styled.div`
  width: 100%;
  height: auto;
  margin: auto;

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
  feedData,
  fetchNextPage,
}: FeedSearchProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const filteredFeeds = useMemo(() => {
    if (!searchKeyword.trim()) return feedData;

    return feedData.filter((feed: FeedData) =>
      feed.mainText.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
  }, [feedData, searchKeyword]);

  return (
    <FeedContainer>
      <SearchBar placeholder="" onSearch={setSearchKeyword} />
      <FilteredInner>
        <FeedPage feedData={filteredFeeds} fetchNextPage={fetchNextPage} />
      </FilteredInner>
    </FeedContainer>
  );
}
