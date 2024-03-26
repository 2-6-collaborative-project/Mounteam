'use client';

import styled from 'styled-components';
import typography from '@/app/styles/typography';
import Tab from '@/src/components/shared/Tab';

const Title = styled.div`
  ${typography.Heading30};
  padding: 1.88rem 0 5rem 0;

  @media (max-width: 768px) {
    ${typography.Heading24};
    padding: 1.25rem 0 5rem 0;
  }
`;

export default function TeamPage() {
  return (
    <>
      <Tab variant="teams" />
      <Title>전체 등산 모임</Title>
      <div>검색 바</div>
    </>
  );
}
