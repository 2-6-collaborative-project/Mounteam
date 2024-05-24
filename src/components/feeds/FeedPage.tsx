import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Avatars from '@/src/components/shared/Avatar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InfoBox } from '@/src/components/shared/InfoBox';
import { colors } from '@/app/styles/colors';
import { useFeedIdStore } from '@/src/store/useFeedIdStore';
import FeedData from '@/src/types/feeds/FeedData';
import { deleteLikes, postLikes } from './api/FeedData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFeedDetailQuery } from './query/useFeedDetailQuery';

export interface FeedPageProps {
  feedData: FeedData[];
  fetchNextPage: () => void;
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

const HeadFont = styled.div`
  color: ${colors.Grayscale[13]};
  font-weight: 600;
  font-size: 12px;
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

// 피드 페이지 컴포넌트 + 무한스크롤 트리거
export default function FeedPage({ feedData, fetchNextPage }: FeedPageProps) {
  const observer = useRef<IntersectionObserver>();

  const handleLastElementTouched = useCallback(
    (element: HTMLElement | null) => {
      // 옵저버 API 설정하기
      if (!observer.current) {
        observer.current = new IntersectionObserver(
          (entries) => {
            // 루트 콘테이너와 교집합이 발생하면(화면 범위에 들어오면)
            if (entries[0].isIntersecting) {
              // 다음 페이지 불러오기
              fetchNextPage(); // 불러오기함수넣어주기
            }
          },
          // 1.0, 타겟 전체가 교집합이 됐을 때 작동
          { threshold: 1 },
        );
      }

      // 타겟이 마운트되서 ref 객체에 참조 객체가 생기면
      if (element) {
        // 타겟 관측 시작
        observer.current.observe(element);
      }

      if (!element) {
        observer.current?.disconnect();
      }
    },
    [fetchNextPage],
  ); // feed State 넣어주기

  return (
    <>
      <FeedGrid>
        {feedData.map((item, index) => (
          <div key={item.reviewId}>
            <FeedHead>
              <HeadWrapper>
                <Avatars type="" img={item.author.profileImageUrl} />
              </HeadWrapper>

              <HeadFont>
                {<p style={{ fontWeight: 400 }}>Lv. {item.author.level}</p>}
                {<p>{item.author.nickname}</p>}
              </HeadFont>
            </FeedHead>

            {Array.isArray(item.imageUrls) ? (
              <Link
                href={{
                  pathname: `/feeds/${item.reviewId}`,
                  query: { feedType: item.type },
                }}
              >
                <PictureBox>
                  <Image
                    src={item.imageUrls[0]}
                    alt="image"
                    fill
                    unoptimized={true}
                  />
                </PictureBox>
              </Link>
            ) : (
              <Link
                href={{
                  pathname: `/feeds/${item.reviewId}`,
                  query: { feedType: item.type },
                }}
              >
                <PictureBox>
                  <Image
                    src={item.imageUrls}
                    alt="피드 이미지"
                    fill
                    unoptimized={true}
                  />
                </PictureBox>
              </Link>
            )}

            <InfoBox feed={item} />
            {item.mainText ? (
              <TextBox>
                <p>{item.mainText}</p>
              </TextBox>
            ) : (
              '게시글의 텍스트가 없을때 이 텍스트가 나옵니다.'
            )}

            {item.tags ? (
              <TagBox>
                {item.tags.map((tag: any, index: number) => (
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

        {feedData.length === 0 && <div>표시할 피드가 없습니다.</div>}
        <div ref={handleLastElementTouched} />
      </FeedGrid>
    </>
  );
}
