'use client';

import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import FeedSearch from '@/src/components/feeds/FeedSearch';
import { getFeedData } from '@/src/components/feeds/api/FeedData';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import FeedData from '@/src/types/feeds/FeedData';
import { useEffect, useRef, useState } from 'react';

const TabContainer = styled.div`
  margin-bottom: 8rem;
`;

const FeedHomeLayer = styled.div`
  width: 100%;
  height: auto;
  margin: auto;
`;

const FeedFlex = styled.div`
  display: flex;
`;

const FeedHomeInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function FeedHome() {
  const {
    data: feedData,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => getFeedData(pageParam, 9),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
  });

  const observerTarget = useRef(null);

  useEffect(() => {
    // 옵저버 API 설정하기

    const observer = new IntersectionObserver(
      (entries) => {
        // 루트 콘테이너와 교집합이 발생하면(화면 범위에 들어오면)
        if (entries[0].isIntersecting) {
          // 다음 페이지 불러오기
          fetchNextPage(); // 불러오기함수넣어주기
          console.log('fetchNextPage', fetchNextPage);
        }
      },
      // 1.0, 타겟 전체가 교집합이 됐을 때 작동
      { threshold: 1 },
    );
    // 타겟이 마운트되서 ref 객체에 참조 객체가 생기면
    if (observerTarget.current) {
      // 타겟 관측 시작
      observer.observe(observerTarget.current);
      console.log('Observer is observing:', observerTarget.current);
    }
    // 해당 컴포넌트 언마운트시 관측 중단
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
    // 타겟에 변동이 생기면(마운트 되면) 이 부수효과 실행
  }, [observerTarget, fetchNextPage]); // feed State 넣어주기

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FeedHomeLayer>
      <TabContainer>
        <Tab />
      </TabContainer>
      <FeedFlex>
        <FeedSearch
          feedData={feedData?.pages}
          observerTarget={observerTarget}
        />
      </FeedFlex>
    </FeedHomeLayer>
  );
}
