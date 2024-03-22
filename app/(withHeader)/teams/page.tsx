'use client';

import styled from 'styled-components';

const Container = styled.div``;

const TopSection = styled.div``;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
`;

const FilterSection = styled.div``;

const ListSection = styled.div``;

export default function TeamPage() {
  return (
    <Container>
      <TopSection>
        <div>전체 등산 모임</div>
        <div>검색 바</div>
      </TopSection>
      <BottomSection>
        <FilterSection>필터</FilterSection>
        <ListSection>리스트</ListSection>
      </BottomSection>
    </Container>
  );
}
