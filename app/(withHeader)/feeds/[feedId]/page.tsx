'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedDetail from '@/src/components/feeds/FeedDetail';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import useFeedParams from '@/src/components/feeds/useFeedParams';
import { useFeedDetailQuery } from '@/src/components/feeds/query/useFeedDetailQuery';

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
  // const [feedDetailData, setFeedDetailData] = useState<FeedData>();
  const { feedId, feedType } = useFeedParams();

  // const getData = useCallback(async () => {
  //   const data = await getFeedSelect(feedType, feedId);
  //   console.log('처음 get', data);
  //   setFeedDetailData(data);
  // }, [feedId, feedType]);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  // useEffect(() => {
  //   console.log('해당 피드의 데이터:', feedDetailData);
  // }, [feedDetailData]);

  const feedDetailQuery = useFeedDetailQuery(feedType, feedId);
  // console.log('page.tsx', feedDetailQuery);
  if (feedDetailQuery.isLoading || feedDetailQuery.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TabContainer>
        <Tab />
      </TabContainer>
      <ContentWrapper>
        <FeedDetail />
        {/* <FeedDetail feedData={feedDetailQuery.data} /> */}
      </ContentWrapper>
    </>
  );
}
