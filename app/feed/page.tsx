'use client';

import FeedPage from '@/src/components/feed/FeedPage';
import FeedSearch from '@/src/components/feed/FeedSearch';
import { FeedLayer } from '@/src/components/feed/styled';

export default function FeedHome() {
  return (
    <FeedLayer>
      <FeedSearch />
      <FeedPage />
    </FeedLayer>
  );
}
