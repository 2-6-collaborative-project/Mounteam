'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedDetail from '@/src/components/feeds/FeedDetail';
import Comment from '@/src/components/feeds/Comment';
import { feedMockData } from '@/src/components/feeds/mock';
import { usePathname } from 'next/navigation';

const DetailContainer = styled.div`
  width: 99.2rem;
  height: 188.5rem;
`;

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
  const feeds = feedMockData();
  const pathname = usePathname();
  const feedId = Number(pathname.split('/')[2]);
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
