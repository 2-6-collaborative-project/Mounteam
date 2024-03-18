import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const LinkCol = styled.div`
  display: flex;
  height: 2.875rem;
  justify-content: start;
  align-items: center;
  color: var(--MDS-GrayScale-13, #000);
  /* Heading/20 */
  /* font-family: Pretendard; */
  column-gap: 2.06rem;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
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
