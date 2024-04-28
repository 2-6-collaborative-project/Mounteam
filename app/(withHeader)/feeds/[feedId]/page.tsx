'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedDetail from '@/src/components/feeds/FeedDetail';
import Comment from '@/src/components/feeds/Comment';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import FeedData from '@/src/types/feeds/FeedData';
import {
  getFeedData,
  getFeedSelect,
} from '@/src/components/feeds/api/FeedData';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

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
  const [pageType, setPageType] = useState<string>();
  const [feedDetailData, setFeedDetailData] = useState<FeedData>();

  const routerParams = useParams();
  const searchParams = useSearchParams();

  const feedId = Array.isArray(routerParams.feedId)
    ? Number(routerParams.feedId[0])
    : Number(routerParams.feedId);

  const feedType = searchParams.get('feedType');

  // const {
  //   data: feedDetailData,
  //   refetch,
  //   isLoading,
  //   isSuccess,
  // } = useQuery<FeedData>({
  //   queryKey: ['FeedData', feedId],
  //   queryFn: () => getFeedSelect(feedId),
  // });
  // const testFn = () => {
  //   refetch();
  // };

  // const { data: feedData } = useQuery<FeedData>({
  //   queryKey: ['FeedData'],
  //   queryFn: () => getFeedData(0, 10),
  // });

  /* const data =getdata() const parsedType = data.data.reviews.filter((item)=>(item.reviewId === feedid))*/

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

  // useEffect(() => {
  //   const filterdData = feedData?.filter(
  //     (item: any) => item.reviewId === feedId,
  //   );
  //   const parsedType = filterdData?.type;
  //   setPageType(parsedType);
  //   getData();
  //   console.table({ parsedType: parsedType, feedId: feedId });
  //   console.log('feedDetailData', feedDetailData);
  //   console.log('feedDataMain', feedData);
  // }, [feedData, pageType, feedDetailData]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!isSuccess) {
  //   return <div>error</div>;
  // }

  return (
    <>
      <TabContainer>
        <Tab />
      </TabContainer>
      <ContentWrapper>
        {/* <FeedDetail feedData={feedDetailData} /> */}
      </ContentWrapper>
    </>
  );
}
