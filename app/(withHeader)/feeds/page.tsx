'use client';

import styled from 'styled-components';
import FeedPage from '@/src/components/feeds/FeedPage';
import FeedSearch from '@/src/components/feeds/FeedSearch';

const FeedHomeLayer = styled.div`
  width: 100%;
  height: auto;
  padding: 18rem;
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
  return (
    <FeedHomeLayer>
      <FeedFlex>
        <FeedSearch />
      </FeedFlex>
      <FeedHomeInner>
        <FeedPage />
      </FeedHomeInner>
    </FeedHomeLayer>
  );
}
