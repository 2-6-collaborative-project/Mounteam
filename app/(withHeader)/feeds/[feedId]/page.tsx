'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedDetail from '@/src/components/feeds/FeedDetail';
import Comment from '@/src/components/feeds/Comment';
import { feedMockData } from '@/src/components/feeds/mock';
import { usePathname } from 'next/navigation';

const DetailContainer = styled.div`
  width: 120rem;
  height: 188.5rem;
`;
const TabContainer = styled.div`
  margin-bottom: 8rem;
`;

const ContentsContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 10rem;
`;

export default function Page() {
  const feeds = feedMockData();
  const pathname = usePathname();
  const feedId = Number(pathname.split('/')[2]);
  const feedData = feeds[feedId - 1];

  return (
    <DetailContainer>
      <TabContainer>
        <Tab variant="feeds" />
      </TabContainer>
      <ContentsContainer>
        <FeedDetail feedData={feedData} />
      </ContentsContainer>
      <Comment feedData={feedData} />
    </DetailContainer>
  );
}
