import React from 'react';
import { feedMockData } from './mock';
import CommentBar from './CommentBar';
import { FeedPageProps } from './FeedPage';

export default function FeedDetail({ feeds }: FeedPageProps) {
  return (
    <div>
      <CommentBar feeds={feeds} />
    </div>
  );
}
