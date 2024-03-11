'use client';

import FeedPage from '@/src/components/feed/FeedPage';
import FeedSearch from '@/src/components/feed/FeedSearch';

export default function FeedHome() {
  return (
    <div>
      <FeedSearch />
      <FeedPage />
    </div>
  );
}
