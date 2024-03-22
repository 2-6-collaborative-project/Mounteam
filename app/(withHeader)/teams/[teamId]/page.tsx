'use client';

import { useParams } from 'next/navigation';
import styled from 'styled-components';

const Container = styled.div``;

const TopSection = styled.div``;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ContentSection = styled.div``;

const Title = styled.div``;

const Details = styled.div``;

const InfoSection = styled.div``;

const LeaderInfo = styled.div``;

const TeamInfo = styled.div``;

export default function TeamDetailsPage() {
  const params = useParams();

  return (
    <Container>
      <div>{params.teamId}번 모임 상세 페이지</div>
      <TopSection>이미지</TopSection>
      <BottomSection>
        <ContentSection>
          <Title>제목</Title>
          <Details>설명</Details>
        </ContentSection>
        <InfoSection>
          <LeaderInfo>주최자 정보</LeaderInfo>
          <TeamInfo>모임 정보</TeamInfo>
        </InfoSection>
      </BottomSection>
    </Container>
  );
}
