'use client';

import getMountainData from '@/src/components/explores/api/getMountainData';
import { useQuery } from '@tanstack/react-query';
import mountainDataProps from '@/src/types/mountainDataProps';
import Tab from '@/src/components/shared/Tab';
import styled from 'styled-components';
import FeedPage from '@/src/components/feeds/FeedPage';
import { feedMockData } from '@/src/components/feeds/mock';

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

  const { data: mountainList } = useQuery({
    queryKey: ['mountainList1'],
    queryFn: () => getMountainData(),
  });

  const clickedMountain = mountainList?.find(
    (list: mountainDataProps) => list.X좌표 === exploreId,
  );

  return (
    <>
      <Container>
        <Tab variant="explores" />

        <MainTitle>{clickedMountain?.명산_이름}</MainTitle>

        <ReviewListContainer>
          <FeedPage feeds={feedMockData()} />
        </ReviewListContainer>
      </Container>
    </>
  );
}
