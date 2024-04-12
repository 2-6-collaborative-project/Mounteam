'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedDetail from '@/src/components/feeds/FeedDetail';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import FeedData from '@/src/types/feeds/FeedData';
import { getFeedSelect } from '@/src/components/feeds/api/FeedData';
import { useState, useEffect, useCallback, memo } from 'react';
import { useSearchParams } from 'next/navigation';

const TabContainer = styled.div`
  margin-bottom: 8rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
`;
const FeedDetailMemo = memo(FeedDetail);

export default function Page() {
  const [feedDetailData, setFeedDetailData] = useState<FeedData>();

  const routerParams = useParams();
  const searchParams = useSearchParams();

  const feedId = Array.isArray(routerParams.feedId)
    ? Number(routerParams.feedId[0])
    : Number(routerParams.feedId);

  const feedType = searchParams.get('feedType');
  console.log(feedType);
  const getData = useCallback(async () => {
    const data = await getFeedSelect(feedType, feedId);
    console.log('처음 get', data);
    setFeedDetailData(data);
  }, [feedId, feedType]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    console.log('해당 피드의 데이터:', feedDetailData);
  }, [feedDetailData]);

  if (!feedDetailData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TabContainer>
        <Tab variant="feeds" />
      </TabContainer>
      <ContentWrapper>
        <FeedDetailMemo feedData={feedDetailData} />
      </ContentWrapper>
    </>
  );
}
