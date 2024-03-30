'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedPage from '@/src/components/feeds/FeedPage';
import FeedSearch from '@/src/components/feeds/FeedSearch';
import { feedMockData } from '@/src/components/feeds/mock';

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
  const feeds = feedMockData();

  return (
    <FeedHomeLayer>
      <TabContainer>
        <Tab variant="feeds" />
      </TabContainer>
      <FeedFlex>
        <FeedSearch />
      </FeedFlex>
      <FeedHomeInner>{/* <FeedPage feeds={feeds} /> */}</FeedHomeInner>
    </FeedHomeLayer>
  );
}
