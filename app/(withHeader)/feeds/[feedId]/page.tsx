'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedDetail from '@/src/components/feeds/FeedDetail';
import Comment from '@/src/components/feeds/Comment';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import FeedData from '@/src/types/feeds/FeedData';
import { getFeedSelect } from '@/src/components/feeds/api/FeedData';

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

export default function Page() {
  const routerParams = useParams();
  const feedId = Array.isArray(routerParams.feedId)
    ? routerParams.feedId[0]
    : routerParams.feedId;

  const {
    data: feedDetailData,
    isLoading,
    isSuccess,
  } = useQuery<FeedData>({
    queryKey: ['FeedData', feedId],
    queryFn: () => getFeedSelect(feedId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>error</div>;
  }

  return (
    <>
      <TabContainer>
        <Tab variant="feeds" />
      </TabContainer>
      <ContentWrapper>
        <FeedDetail feedData={feedDetailData} />
        <Comment feedData={feedDetailData} />
      </ContentWrapper>
    </>
  );
}
