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
  width: 31.5rem;
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
  width: 31.5rem;
  height: 31.5rem;
  position: relative;
  background-color: ${colors.Grayscale[4]};

  & img {
    object-fit: contain;
  }
`;

const NoImageBox = styled.div`
  display: flex;
  width: 31.5rem;
  height: 31.5rem;
  background-color: whitesmoke;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

interface Author {
  profileImageUrl: string;
  level: number;
  nickname: string;
}

interface Feed {
  author: Author;
  imageUrl?: string;
  id: number;
}

export default function FeedThumbnail({ feed }: { feed: Feed }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/feed/${feed.id}`);
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

      {feed.imageUrl ? (
        <PictureBox>
          <Image src={feed.imageUrl} alt="feed image" fill unoptimized={true} />
        </PictureBox>
      ) : (
        <NoImageBox>
          <p>올린 이미지가 없습니다.</p>
        </NoImageBox>
      )}
    </div>
  );
}
