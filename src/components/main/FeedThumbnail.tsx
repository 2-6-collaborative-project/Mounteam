'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Avatars from '@/src/components/shared/Avatar';
import { colors } from '@/app/styles/colors';

const FeedHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding-bottom: 1.1rem;
`;

const HeadWrapper = styled.div`
  position: relative;
  background-color: ${colors.Grayscale[3]};
  border-radius: 50%;
  overflow: hidden;
`;

const HeadFont = styled.div`
  color: ${colors.Grayscale[13]};
  font-weight: 600;
  font-size: 12px;

  p {
    font-weight: 400;
  }
`;

const PictureBox = styled.div`
  cursor: pointer;
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${colors.Grayscale[3]};

  & > span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const NoImageBox = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${colors.Grayscale[3]};

  &::after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  > p {
    position: absolute;
  }
`;

interface Author {
  profileImageUrl: string;
  level: number;
  nickname: string;
}

interface Feed {
  author: Author;
  imageUrls?: string;
  reviewId: number;
}

export default function FeedThumbnail({ feed }: { feed: Feed }) {
  const router = useRouter();

  // 이동 경로 판별 로직 수정 필요
  const handleClick = () => {
    router.push(`/feeds/${feed.reviewId}`);
  };

  return (
    <div onClick={handleClick}>
      <FeedHead>
        <HeadWrapper>
          <Avatars type="" img={feed.author.profileImageUrl} />
        </HeadWrapper>
        <HeadFont>
          <p>Lv. {feed.author.level}</p>
          <p>{feed.author.nickname}</p>
        </HeadFont>
      </FeedHead>

      {feed.imageUrls ? (
        <PictureBox>
          <Image
            src={feed.imageUrls}
            alt="feed image"
            layout="fill"
            objectFit="cover"
            unoptimized={true}
          />
        </PictureBox>
      ) : (
        <NoImageBox>
          <p>올린 이미지가 없습니다.</p>
        </NoImageBox>
      )}
    </div>
  );
}
