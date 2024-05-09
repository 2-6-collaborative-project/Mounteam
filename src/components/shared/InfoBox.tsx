import React from 'react';
import styled from 'styled-components';
import heart from '@/public/heart.svg';
import fillHeart from '@/public/fillHeart.svg';
import message from '@/public/message.svg';
import bookmark from '@/public/bookmark.svg';
import fillBookmark from '@/public/fillBookmark.svg';
import Image from 'next/image';
import FeedData from '@/src/types/feeds/FeedData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFeedDetailQuery } from '../feeds/query/useFeedDetailQuery';
import { deleteLikes, postLikes } from '../feeds/api/FeedData';
import useFeedParams from '../feeds/useFeedParams';

interface InfoBoxProps {
  feed: FeedData;
  $paddingleft?: string;
}

interface LikeButtonProps {
  feed: FeedData;
}

interface CommentComponentProps {
  comments: string[];
  commentCnt: number;
}

interface BookmarkComponentProps {
  isSaved?: boolean;
  $paddingleft?: string;
}

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  padding-top: 1.1rem;

  & p {
    color: #000;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.2rem;
  }
`;

const LikeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  & img {
    cursor: pointer;
  }
`;

const CommentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  & img {
    cursor: pointer;
  }
`;

const BookmarkBox = styled.div<{ $paddingleft?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: ${({ $paddingleft }) => $paddingleft || 'rem'};
  gap: 7px;

  & img {
    cursor: pointer;
  }
`;

const LikeButton: React.FC<LikeButtonProps> = ({
  feed: { reviewId, type, liked, likeCnt },
}) => {
  const queryClient = useQueryClient();

  const postLikeMutation = useMutation({
    mutationFn: (reviewId: number) => postLikes(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['feed', 'list'],
      });

      queryClient.invalidateQueries({
        queryKey: ['feed', 'detail', type, reviewId],
      });
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: (reviewId: number) => deleteLikes(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['feed', 'list'],
      });

      queryClient.invalidateQueries({
        queryKey: ['feed', 'detail', type, reviewId],
      });
    },
  });

  return (
    <LikeBox>
      {liked ? (
        <Image
          src={fillHeart}
          alt="좋아요 갯수 확인 아이콘"
          onClick={() => deleteLikeMutation.mutate(reviewId)}
        />
      ) : (
        <Image
          src={heart}
          alt="좋아요 갯수 확인 아이콘"
          onClick={() => postLikeMutation.mutate(reviewId)}
        />
      )}
      <p>{likeCnt}</p>
    </LikeBox>
  );
};

const CommentComponent: React.FC<CommentComponentProps> = ({
  comments,
  commentCnt,
}) => (
  <CommentBox>
    <Image src={message} alt="코멘트 갯수 확인 아이콘" />
    <p>{commentCnt}</p>
  </CommentBox>
);

const BookmarkComponent: React.FC<BookmarkComponentProps> = ({
  isSaved,
  $paddingleft,
}) => (
  <BookmarkBox $paddingleft={$paddingleft}>
    {isSaved ? (
      <Image src={fillBookmark} alt="피드 저장 했으면 이 아이콘 뜸" />
    ) : (
      <Image src={bookmark} alt="피드 저장 여부 확인 아이콘" />
    )}
  </BookmarkBox>
);

export const InfoBox: React.FC<InfoBoxProps> = ({ feed, $paddingleft }) => {
  return (
    <InfoContainer>
      <LikeButton feed={feed} />
      <CommentComponent comments={feed.comments} commentCnt={feed.commentCnt} />
      <BookmarkComponent isSaved={feed.isSaved} $paddingleft={$paddingleft} />
    </InfoContainer>
  );
};
