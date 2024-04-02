'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';
import { IBM } from '@/app/styles/.fonts';

const MainTitle = styled.h2`
  display: flex;
  padding: 1.87rem 0 5rem 0;
  flex-direction: column;
  align-items: flex-start;
  color: ${colors.Grayscale[13]};
  ${typography.Heading30};

  @media (max-width: 768px) {
    padding: 1.25rem 0 5rem 0;
    ${typography.Heading24};
  }
`;

const GallerySection = styled.div`
  border-radius: 0.3125rem;
  border: 1px solid ${colors.Grayscale[13]};
`;

const GalleryTitle = styled.div``;

const GalleryDescription = styled.div`
  color: ${colors.Grayscale[13]};
  font-size: 1.6475rem;
  line-height: 2.5875rem;
`;

export default function Season() {
  return (
    <div>
      <Tab variant="main" />
      <MainTitle>부제</MainTitle>
      <GallerySection>
        <Image
          src="/season.png"
          alt="메인 배경 이미지"
          width={992}
          height={436}
          priority
        />
        <GalleryTitle>MOUNTEAM CURATION</GalleryTitle>
        <GalleryDescription className={IBM.className}>
          <p>새로운 계절, 새로운 모험! </p>
          <p>마운팀에서 새로운 산을 찾아보세요</p>
        </GalleryDescription>
      </GallerySection>
    </div>
  );
}
