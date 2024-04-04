import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import meatballs from '@/public/meatballs.svg';
import Avatars from '@/src/components/shared/Avatar';
import FeedModify from '@/src/components/feeds/FeedModify';
import { useState } from 'react';
import { CustomPopover } from '@/src/components/shared/CustomPopover';
import { InfoBox } from '@/src/components/shared/InfoBox';
import { useRouter } from 'next/navigation';
import { colors } from '@/app/styles/colors';
import { useFeedIdStore } from '@/src/store/useFeedIdStore';

interface FeedImgProps {
  imageUrl?: string;
}

export interface FeedPageProps {
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

  background-color: ${colors.Grayscale[3]};
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

const HeadFont = styled.div`
  color: ${colors.Grayscale[13]};
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
  cursor: pointer;
  width: 31.5rem;
  height: 31.5rem;
  position: relative;

  & img {
    object-fit: contain;
    background-color: ${colors.Grayscale[4]};
  }
`;

const TextBox = styled.div`
  width: 31.5rem;
  padding-top: 1.1rem;

  & p {
    color: ${colors.Grayscale[13]};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.1rem;
    letter-spacing: -0.14px;
    height: 3.3em;
    overflow: hidden;
    text-overflow: elipsis;
    -webkit-line-clamp: 2;
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
  border: 1px solid ${colors.Primary[500]};
  border-radius: 3px;
  background-color: ${colors.Grayscale[1]};

  & p {
    color: ${colors.Primary[500]};
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { editFeedId, setEditFeedId } = useFeedIdStore();

  console.log(feeds);
  const router = useRouter();
  // 수정 엔드포인트 => {`/feeds/${feedId}/edit`}
  // 삭제 엔드포인트 => {`/feeds/${feedId}/delete`}

  const handleEditClick = (feedId: number) => {
    setEditFeedId(feedId);
    setIsModalOpen(!isModalOpen);
  };

  const content = (feedId: number) => (
    <PopoverContentBox>
      <p onClick={() => handleEditClick(feedId)}>수정</p>
      <p>삭제</p>
    </PopoverContentBox>
  );

  return (
    <>
      <FeedGrid>
        {feeds.map((feed: any) => (
          <div key={feed.id}>
            <FeedHead>
              <HeadWrapper>
                <Avatars type="" img={feed.author.profileImageUrl} />
              </HeadWrapper>

              <HeadFont>
                {<p style={{ fontWeight: 400 }}>Lv. {feed.author.level}</p>}
                {<p>{feed.author.nickname}</p>}
              </HeadFont>

              <MeatBallFrame>
                {feed.createdByme && (
                  <CustomPopover content={content(feed.id)}>
                    <Image src={meatballs} alt="미트볼" />
                  </CustomPopover>
                )}
              </MeatBallFrame>
            </FeedHead>

            {feed.imageUrl ? (
              <PictureBox onClick={() => router.push(`/feeds/${feed.id}`)}>
                <Image
                  layout="responsive"
                  width={260}
                  height={260}
                  src={feed.imageUrl}
                  alt="image"
                  unoptimized={true}
                />
              </PictureBox>
            ) : (
              <PictureBox onClick={() => router.push(`/feeds/${feed.id}`)}>
                <div
                  style={{
                    display: 'flex',
                    width: '31.5rem',
                    height: '31.5rem',
                    backgroundColor: 'whitesmoke',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p>올린 이미지가 없습니다.</p>
                </div>
              </PictureBox>
            )}

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
                {feed.tags.map((tag: any, index: number) => (
                  <TagWrapper key={index}>
                    <p>{tag}</p>
                  </TagWrapper>
                ))}
              </TagBox>
            ) : (
              ''
            )}
            {isModalOpen && editFeedId !== null && (
              <FeedModify
                feedId={editFeedId}
                modalOpenState={isModalOpen}
                setter={setIsModalOpen}
              />
            )}
          </div>
        ))}
      </FeedGrid>
    </>
  );
}
