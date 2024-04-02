import React from 'react';
import styled from 'styled-components';
import heart from '@/public/heart.svg';
import fillHeart from '@/public/fillHeart.svg';
import message from '@/public/message.svg';
import bookmark from '@/public/bookmark.svg';
import fillBookmark from '@/public/fillBookmark.svg';
import Image from 'next/image';
import FeedData from '@/src/types/feeds/FeedData';

interface InfoBoxProps {
  feed: FeedData;
  $paddingleft?: string;
}

interface LikeComponentProps {
  isLiked: boolean;
  likesCount: number;
}

interface CommentComponentProps {
  comments: string[];
  commentCnt: number;
}

interface BookmarkComponentProps {
  isSaved: boolean;
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
  padding-left: ${({ $paddingleft }) => $paddingleft || '19rem'};
  gap: 7px;

  & img {
    cursor: pointer;
  }
`;

const LikeComponent: React.FC<LikeComponentProps> = ({
  isLiked,
  likesCount,
}) => (
  <LikeBox>
    {isLiked ? (
      <Image src={fillHeart} alt="좋아요 갯수 확인 아이콘" />
    ) : (
      <Image src={heart} alt="좋아요 갯수 확인 아이콘" />
    )}
    <p>{likesCount}</p>
  </LikeBox>
);

const CommentComponent: React.FC<CommentComponentProps> = ({ commentCnt }) => (
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

export const InfoBox: React.FC<InfoBoxProps> = ({ feed, $paddingleft }) => (
  <InfoContainer>
    <LikeComponent isLiked={feed.isLiked} likesCount={feed.likesCount} />
    <CommentComponent comments={feed.comments} commentCnt={feed.commentCnt} />
    <BookmarkComponent isSaved={feed.isSaved} $paddingleft={$paddingleft} />
  </InfoContainer>
);
