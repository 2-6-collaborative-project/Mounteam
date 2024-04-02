'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

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

export default function Season() {
  return (
    <div>
      <Tab variant="main" />
      <MainTitle>부제</MainTitle>
      <Image
        src="/season.png"
        alt="메인 배경 이미지"
        width={992}
        height={436}
        priority
      />
    </div>
  );
}
