'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedSearch from '@/src/components/feeds/FeedSearch';
import { getFeedData } from '@/src/components/feeds/api/FeedData';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import FeedData from '@/src/types/feeds/FeedData';

const TabContainer = styled.div`
  margin-bottom: 8rem;
`;

const FeedHomeLayer = styled.div`
  width: 100%;
  height: auto;
  margin: auto;
`;

const FeedFlex = styled.div`
  display: flex;
`;

const FeedHomeInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function FeedHome() {
  const {
    data: feedData,
    isPending,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['feed', 'list'],
    queryFn: ({ pageParam }) => getFeedData(0, 9),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.hasMore ? lastPageParam + 1 : undefined,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FeedHomeLayer>
      <TabContainer>
        <Tab variant="feeds" />
      </TabContainer>
      <FeedFlex>
        <FeedSearch feedData={feedData?.pages} />
      </FeedFlex>
    </FeedHomeLayer>
  );
}
