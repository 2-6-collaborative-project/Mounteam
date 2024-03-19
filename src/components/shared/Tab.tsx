import Link from 'next/link';
import styled, { css } from 'styled-components';
import typography from '@/app/styles/typography';

type Variant = 'main' | 'explore' | 'feeds' | 'teams';

const LinkCol = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  color: var(--MDS-GrayScale-13, #000);
  border-bottom: 1px solid #f0f0f0;
  column-gap: 2.06rem;
  ${typography.Heading20}
`;

const StyledParagraph = styled.p<{ variant?: Variant }>`
  padding: 1rem 0rem;

  color: ${({ variant }) =>
    variant === 'main' ? 'var(--brand-deep, #0008ce)' : 'inherit'};
  border-bottom: ${({ variant }) =>
    variant === 'main' ? '1px solid var(--brand-deep, #0008ce)' : 'none'};

  // hover시 색 변화가 있어야할 것 같아 아래 설정 추가했습니다. 제외해야 할까요?
  &:hover {
    color: var(--brand-deep, #0008ce);
  }
`;

interface TabProps {
  variant: Variant;
}

// 엔드포인트 명에 맞게 링크명에 s 달았습니다.

export default function Tab({ variant }: TabProps) {
  return (
    <div>
      <LinkCol>
        <Link href="/" passHref>
          <StyledParagraph variant={variant}>추천</StyledParagraph>
        </Link>
        <Link href="/explores" passHref>
          <StyledParagraph
            variant={variant === 'explore' ? 'explore' : undefined}
          >
            탐험
          </StyledParagraph>
        </Link>
        <Link href="/feeds" passHref>
          <StyledParagraph variant={variant === 'feeds' ? 'feeds' : undefined}>
            피드
          </StyledParagraph>
        </Link>
        <Link href="/teams" passHref>
          <StyledParagraph variant={variant === 'teams' ? 'teams' : undefined}>
            모임
          </StyledParagraph>
        </Link>
      </LinkCol>
    </div>
  );
}
