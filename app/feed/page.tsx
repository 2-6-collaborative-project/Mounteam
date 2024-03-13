'use client';

import FeedPage from '@/src/components/feed/FeedPage';
import FeedSearch from '@/src/components/feed/FeedSearch';
import { FeedHomeInner, FeedHomeLayer } from '@/src/components/feed/styled';

export default function FeedHome() {
  return (
    <FeedHomeLayer>
      <FeedHomeInner>
        <FeedSearch />
        <FeedPage />
      </FeedHomeInner>
    </FeedHomeLayer>
  );
}
