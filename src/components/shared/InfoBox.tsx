import React from 'react';
import styled from 'styled-components';
import heart from '@/public/heart.svg';
import fillHeart from '@/public/fillHeart.svg';
import message from '@/public/message.svg';
import bookmark from '@/public/bookmark.svg';
import fillBookmark from '@/public/fillBookmark.svg';
import Image from 'next/image';
import { Feed } from '@/src/components/feeds/mock';

interface InfoBoxProps {
  feed: Feed;
}

interface LikeComponentProps {
  isLiked: boolean;
  likesCount: number;
}

interface CommentComponentProps {
  comments: string[];
}

interface BookmarkComponentProps {
  isSaved: boolean;
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

const BookmarkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 19rem;
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

const CommentComponent: React.FC<CommentComponentProps> = ({ comments }) => (
  <CommentBox>
    <Image src={message} alt="코멘트 갯수 확인 아이콘" />
    <p>{comments.length}</p>
  </CommentBox>
);

const BookmarkComponent: React.FC<BookmarkComponentProps> = ({ isSaved }) => (
  <BookmarkBox>
    {isSaved ? (
      <Image src={fillBookmark} alt="피드 저장 했으면 이 아이콘 뜸" />
    ) : (
      <Image src={bookmark} alt="피드 저장 여부 확인 아이콘" />
    )}
  </BookmarkBox>
);

export const InfoBox: React.FC<InfoBoxProps> = ({ feed }) => (
  <InfoContainer>
    <LikeComponent isLiked={feed.isLiked} likesCount={feed.likesCount} />
    <CommentComponent comments={feed.comments} />
    <BookmarkComponent isSaved={feed.isSaved} />
  </InfoContainer>
);
