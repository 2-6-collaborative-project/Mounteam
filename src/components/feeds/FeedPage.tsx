import React from 'react';
import Image from 'next/image';
import { CustomPopover } from '@/src/components/shared/CustomPopover';
import { feedMockData } from './mock';
import user from '@/public/user.svg';
import meatballs from '@/public/meatballs.svg';
import styled from 'styled-components';
import { InfoBox } from '../shared/InfoBox';
import Link from 'next/link';

interface FeedImgProps {
  imageUrl?: string;
}

interface FeedPageProps {
  feeds: any;
}

const FeedGrid = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3.5rem;
  column-gap: 2.3rem;

  @media (min-width: 768px) and (max-width: 1020px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FeedHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: 31.5rem;
  padding-bottom: 1.1rem;
`;

const HeadWrapper = styled.div`
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  background-color: whitesmoke;
  border-radius: 50%;
  overflow: hidden;
`;

const FeedImg = styled.div<FeedImgProps>`
  display: flex;
  width: 3rem;
  height: 3rem;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
`;

const AvatarImage = styled.img`
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 0.75rem;
  left: 0.75rem;
`;

const HeadFont = styled.div`
  color: var(--black-000000);
  font-weight: 600;
  font-size: 12px;
`;

const MeatBallFrame = styled.div`
  display: flex;
  position: absolute;
  padding: 10px 0px 10px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  & img {
    cursor: pointer;
    position: relative;
    margin-left: 28rem;
    width: auto;
    height: auto;
  }
`;

const PictureBox = styled.div`
  width: 31.5rem;
  height: 31.5rem;
`;

const TextBox = styled.div`
  width: 31.5rem;
  padding-top: 1.1rem;

  & p {
    color: var(--black-000000);
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.1rem;
    letter-spacing: -0.14px;
  }
`;

const TagBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding-top: 1.1rem;
  border: none;
`;

const TagWrapper = styled.div`
  display: flex;
  padding: 0.1rem 0.8rem;
  align-items: center;
  gap: 0.3rem;
  border: 1px solid #0331d1;
  border-radius: 3px;
  background-color: var(--white-FFFFFF);

  & p {
    color: #0331d1;
  }
`;

const PopoverContentBox = styled.div`
  display: flex;
  cursor: pointer;
  width: 71px;
  flex-direction: column;
  align-items: center;
`;

// 후기 컴포넌트
export default function FeedPage({ feeds }: FeedPageProps) {
  // 수정 엔드포인트 => {`/feeds/${feedId}/edit`}
  // 삭제 엔드포인트 => {`/feeds/${feedId}/delete`}
  const content = (
    <PopoverContentBox>
      <Link href="/">수정</Link>
      <Link href="/">삭제</Link>
    </PopoverContentBox>
  );

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
                  <CustomPopover content={content}>
                    <Image src={meatballs} alt="미트볼" />
                  </CustomPopover>
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

            {/* <InfoContainer>
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
            </InfoContainer> */}

            <InfoBox feed={feed} />

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
