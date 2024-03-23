'use client';

import React from 'react';
import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import { feedMockData } from '@/src/components/feeds/mock';
import FeedDetail from '@/src/components/feeds/FeedDetail';

const TabContainer = styled.div`
  margin-bottom: 8rem;
`;

const ContentsContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
`;

export default function page() {
  const feed = feedMockData();
  return (
    <>
      <TabContainer>
        <Tab variant="feeds" />
      </TabContainer>
      <ContentsContainer>
        <FeedDetail></FeedDetail>
      </ContentsContainer>
    </>
  );
}
