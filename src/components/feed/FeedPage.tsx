import React from 'react';
import Image from 'next/image';
import {
  FeedGrid,
  FeedHead,
  AvatarImage,
  HeadWrapper,
  MeatBallFrame,
  TagBox,
  TagWrapper,
  PictureBox,
  TextBox,
  InfoBox,
  BookmarkBox,
  LikeBox,
  CommentBox,
  HeadFont,
} from './styled';
import { SelectPopover } from '../shared/Modal';
import { feedMockData } from './mock';
import user from '@/public/user.svg';
import meatballs from '@/public/meatballs.svg';
import heart from '@/public/heart.svg';
import fillHeart from '@/public/fillHeart.svg';
import message from '@/public/message.svg';
import bookmark from '@/public/bookmark.svg';
import fillBookmark from '@/public/fillBookmark.svg';
import { Popover } from 'antd';
import Link from 'next/link';

// 후기 컴포넌트
export default function FeedPage() {
  const feeds = feedMockData();

  return (
    <>
      <FeedGrid>
        {feeds.map((feed) => (
          <div key={feed.id}>
            <FeedHead>
              <div>
                <HeadWrapper>
                  <AvatarImage
                    src={
                      feed.author.profileImageUrl
                        ? feed.author.profileImageUrl
                        : user.src
                    }
                    alt="User"
                  />
                </HeadWrapper>
              </div>
              <HeadFont>
                {<p style={{ fontWeight: 400 }}>Lv. {feed.author.level}</p>}
                {<p>{feed.author.nickname}</p>}
              </HeadFont>

              <MeatBallFrame>
                {feed.createdByme && (
                  <Popover
                    content={
                      <div style={{ cursor: 'pointer' }}>
                        <p>수정</p>
                        <p>삭제</p>
                      </div>
                    }
                  >
                    <Image src={meatballs} alt="미트볼" />
                  </Popover>
                )}
              </MeatBallFrame>
            </FeedHead>

            {feed.imageUrl ? (
              <PictureBox>{feed.imageUrl}</PictureBox>
            ) : (
              <div
                style={{
                  width: '31.5rem',
                  height: '31.5rem',
                  backgroundColor: 'whitesmoke',
                }}
              ></div>
            )}

            <InfoBox>
              <LikeBox>
                {feed.isLiked ? (
                  <Image src={fillHeart} alt="좋아요 갯수 확인 아이콘" />
                ) : (
                  <Image src={heart} alt="좋아요 갯수 확인 아이콘" />
                )}
                <p>{feed.likesCount}</p>
              </LikeBox>
              <CommentBox>
                <Image src={message} alt="코멘트 갯수 확인 아이콘" />
                <p>{feed.comments.length}</p>
              </CommentBox>
              <BookmarkBox>
                {feed.isSaved ? (
                  <Image
                    src={fillBookmark}
                    alt="피드 저장 했으면 이 아이콘 뜸"
                  />
                ) : (
                  <Image src={bookmark} alt="피드 저장 여부 확인 아이콘" />
                )}
              </BookmarkBox>
            </InfoBox>

            {feed.mainText ? (
              <TextBox>
                <p>{feed.mainText}</p>
              </TextBox>
            ) : (
              '게시글의 텍스트가 없을때 이 텍스트가 나옵니다.'
            )}

            {feed.tags ? (
              <TagBox>
                {feed.tags.map((tag, index) => (
                  <TagWrapper key={index}>
                    <p>{tag}</p>
                  </TagWrapper>
                ))}
              </TagBox>
            ) : (
              ''
            )}
          </div>
        ))}
      </FeedGrid>
    </>
  );
}
