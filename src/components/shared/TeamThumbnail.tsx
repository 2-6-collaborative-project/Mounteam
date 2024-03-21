'use client';

import styled from 'styled-components';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

const TeamBox = styled.div`
  display: flex;
  width: 30.25rem;
  padding: 1.125rem 0.9375rem;
  align-items: flex-start;
  gap: 1.875rem;
`;

const ImageSection = styled.div`
  width: 6.875rem;
  height: 6.875rem;
  border-radius: 100%;
  background: ${colors.Grayscale[5]};
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.Grayscale[7]};
  ${typography.Body16}
  p {
    margin: 0;
  }
`;

const Title = styled.div`
  color: ${colors.Grayscale[13]};
  ${typography.Heading20};
  padding-bottom: 0.31rem;
`;

export default function TeamThumbnail() {
  return (
    <TeamBox>
      <ImageSection />
      <TeamInfo>
        <Title>모임 제목</Title>
        <p>관악산 입구 | 3.27(수) | 오후 2시</p>
      </TeamInfo>
    </TeamBox>
  );
}
