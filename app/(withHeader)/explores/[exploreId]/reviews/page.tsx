'use client';

import { useQuery } from '@tanstack/react-query';
import mountainDataProps from '@/src/types/mountainDataProps';
import Tab from '@/src/components/shared/Tab';
import styled from 'styled-components';
import FeedPage from '@/src/components/feeds/FeedPage';
import { feedMockData } from '@/src/components/feeds/mock';
import { authInstance, defaultInstance } from '@/src/lib/axiosInstance';

const Container = styled.div``;

const MainTitle = styled.h2`
  margin-top: 4.8rem;
  margin-bottom: 6.67rem;
  font-size: 3rem;
  font-weight: 600;
`;

const ReviewListContainer = styled.div``;

export default function ExploreReviewList({
  params,
}: {
  params: { exploreId: number };
}) {
  const exploreId = params.exploreId;

  const { data: reviewData } = useQuery({
    queryKey: ['reviewList'],
    queryFn: () => authInstance.get(`/team-reviews/${exploreId}`),
  });

  const reviewList = reviewData?.data.data;

  return (
    <>
      <Container>
        <Tab variant="explores" />

        <MainTitle>{reviewList?.mountain}</MainTitle>

        <ReviewListContainer>
          <FeedPage feedData={[reviewList]} />
        </ReviewListContainer>
      </Container>
    </>
  );
}
