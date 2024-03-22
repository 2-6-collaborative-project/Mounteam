import Link from 'next/link';
import styled, { css } from 'styled-components';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

type Variant = 'main' | 'explores' | 'feeds' | 'teams';

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

const StyledParagraph = styled.p<{ $variant?: Variant }>`
  padding: 1rem 0rem;

  color: ${({ $variant }) =>
    $variant === 'main' ? colors.Primary[500] : 'inherit'};
  border-bottom: ${({ $variant }) =>
    $variant === 'main' ? `1px solid ${colors.Primary[500]}` : 'none'};

  &:hover {
    color: ${colors.Primary[500]};
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
          <StyledParagraph $variant={variant}>추천</StyledParagraph>
        </Link>
        <Link href="/explores" passHref>
          <StyledParagraph
            $variant={variant === 'explores' ? 'explores' : undefined}
          >
            탐험
          </StyledParagraph>
        </Link>
        <Link href="/feeds" passHref>
          <StyledParagraph $variant={variant === 'feeds' ? 'feeds' : undefined}>
            피드
          </StyledParagraph>
        </Link>
        <Link href="/teams" passHref>
          <StyledParagraph $variant={variant === 'teams' ? 'teams' : undefined}>
            모임
          </StyledParagraph>
        </Link>
      </LinkCol>
    </div>
  );
}
