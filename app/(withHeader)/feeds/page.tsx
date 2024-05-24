'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedSearch from '@/src/components/feeds/FeedSearch';
import { getFeedData } from '@/src/components/feeds/api/FeedData';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import FeedData from '@/src/types/feeds/FeedData';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  flex-direction: column;
  margin-bottom: 10rem;
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
    isLoading,
    isPending,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => getFeedData(pageParam, 9),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
  });

  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }

  if (isError) return <div></div>;

  return (
    <FeedHomeLayer>
      <TabContainer>
        <Tab />
      </TabContainer>
      <FeedFlex>
        <FeedSearch
          feedData={feedData.pages.flatMap((item) => item.reviews)}
          fetchNextPage={fetchNextPage}
        />
      </FeedFlex>
    </FeedHomeLayer>
  );
}
