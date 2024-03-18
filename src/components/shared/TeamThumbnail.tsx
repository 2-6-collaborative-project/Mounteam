'use client';

import Image from 'next/image';
import styled from 'styled-components';

const ImageSection = styled.div`
  width: 19.6875rem;
  height: 19.6875rem;
  border-radius: 0.1875rem;
  background: var(--MDS-GrayScale-5, #d9d9d9);
  margin-bottom: 0.62rem;
`;

const Title = styled.div`
  color: var(--MDS-GrayScale-13, #000);

  /* Heading/20 */
  /* font-family: Pretendard; */
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.75rem; /* 140% */
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--MDS-GrayScale-7, #8c8c8c);
  /* Body/16 */
  /* font-family: Pretendard; */
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem;
  p {
    margin: 0;
  }
`;

const TeamInfoRow = styled.div`
  display: flex;
  align-items: center;
  /* Footnote/12 */
  /* font-family: Pretendard; */
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 166.667% */
`;

export default function TeamThumbnail() {
  return (
    <div>
      <ImageSection />
      <Title>모임 제목</Title>
      <TeamInfo>
        <p>관악산 입구 | 3.27(수) | 오후 2시</p>
        <TeamInfoRow>
          <Image src="/team.svg" alt="team icon" width={16} height={16} />
          <p>3/10</p>
        </TeamInfoRow>
      </TeamInfo>
    </div>
  );
}
