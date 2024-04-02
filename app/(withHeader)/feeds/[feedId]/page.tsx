'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedDetail from '@/src/components/feeds/FeedDetail';
import Comment from '@/src/components/feeds/Comment';
import { feedMockData } from '@/src/components/feeds/mock';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import FeedData from '@/src/types/feeds/FeedData';
import { getFeedData } from '@/src/components/feeds/api/FeedData';

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
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzMyIiwiZXhwIjoxNzExOTgyMjY2fQ.ZCOtn10RFxP_d9Fu8wy1VNvuF-xvNUstPpFa0CvhX0U';

export default function Page() {
  const pathname = usePathname();
  const feedId = Number(pathname.split('/')[2]);

  const { data: feedDatas, isLoading } = useQuery<FeedData[]>({
    queryKey: ['FeedData'],
    queryFn: () => getFeedData(0, 9, accessToken),
  });
  // const feeds = feedMockData();
  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중인 경우 로딩 인디케이터 표시
  }
  const feeds = feedDatas ?? [];
  const feedData = feeds[feedId - 1];
  return (
    <>
      <TabContainer>
        <Tab variant="feeds" />
      </TabContainer>
      <ContentWrapper>
        <FeedDetail feedData={feedData} />
        <Comment feedData={feedData} />
      </ContentWrapper>
    </>
  );
}
