'use client';

import Link from 'next/link';
import styled from 'styled-components';

const LinkCol = styled.div`
  display: flex;
  width: 100%;
  height: 2.875rem;
  justify-content: start;
  align-items: center;
  color: var(--MDS-GrayScale-13, #000);
  border-bottom: 1px solid #f0f0f0;
  /* Heading/20 */
  /* font-family: Pretendard; */
  column-gap: 2.06rem;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem; /* 140% */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }

  p {
    margin: 0;
    color: inherit;
  }
`;

// useRouter쓰는 방식말고 걍 type 지정해서 children으로 내려주는 방식으로 쓰자
export default function Tab() {
  return (
    <div>
      <LinkCol>
        <StyledLink href="/">
          <p>추천</p>
        </StyledLink>
        <StyledLink href="/explore">
          <p>탐험</p>
        </StyledLink>
        <StyledLink href="/feed">
          <p>피드</p>
        </StyledLink>
        <StyledLink href="/team">
          <p>모임</p>
        </StyledLink>
      </LinkCol>
    </div>
  );
}
