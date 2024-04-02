'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedSearch from '@/src/components/feeds/FeedSearch';
import { getFeedData } from '@/src/components/feeds/api/FeedData';
import { useQuery } from '@tanstack/react-query';
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
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzMyIiwiZXhwIjoxNzExOTgyMjY2fQ.ZCOtn10RFxP_d9Fu8wy1VNvuF-xvNUstPpFa0CvhX0U';
export default function FeedHome() {
  const { data: feedData, isLoading } = useQuery<FeedData[]>({
    queryKey: ['FeedData'],
    queryFn: () => getFeedData(0, 9, accessToken),
  });
  // const feeds = feedMockData();
  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중인 경우 로딩 인디케이터 표시
  }
  return (
    <FeedHomeLayer>
      <TabContainer>
        <Tab variant="feeds" />
      </TabContainer>
      <FeedFlex>
        <FeedSearch feedData={feedData} />
      </FeedFlex>
      <FeedHomeInner>{/* <FeedPage feeds={feeds} /> */}</FeedHomeInner>
    </FeedHomeLayer>
  );
}
