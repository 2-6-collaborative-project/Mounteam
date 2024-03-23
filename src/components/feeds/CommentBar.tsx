import { useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import avatar from '@/public/avatar.svg';
import { FeedPageProps } from './FeedPage';

const CommentBarContainer = styled.div`
  display: flex;
  width: 484px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid black;
`;

const CommentBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 100px;
  background: var(#bfbfbf);
  object-fit: auto;

  & img {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
    background-color: gray;
    border-radius: 100%;
    padding: 0.5rem;
  }
`;

const TextWrapper = styled.div`
  width: 100%;

  & input {
    border: none;
    padding: 0.5rem 0 0.5rem 1rem;

    ::placeholder {
      color: var(#8c8c8c);
      text-align: center;
      font-size: 20px;
      font-weight: 400;
      line-height: 36px;
    }
  }
`;

export default function CommentBar({ feeds }: FeedPageProps) {
  const userProfileImageUrl = feeds?.author?.profileImageUrl;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <CommentBarContainer onClick={handleClick}>
      <CommentBarWrapper>
        {userProfileImageUrl ? (
          <AvatarWrapper>
            <Image
              src={userProfileImageUrl}
              alt="avatar"
              width={24}
              height={24}
            />
          </AvatarWrapper>
        ) : (
          <AvatarWrapper>
            <Image src={avatar} alt="default avatar" width={24} height={24} />
          </AvatarWrapper>
        )}
        <TextWrapper>
          <input placeholder="댓글 쓰기" ref={inputRef} />
        </TextWrapper>
      </CommentBarWrapper>
    </CommentBarContainer>
  );
}
