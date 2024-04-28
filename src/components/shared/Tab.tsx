import Link from 'next/link';
import styled from 'styled-components';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';
import useSearchMountainStore from '@/src/store/useSearchMountainStore';
import { usePathname } from 'next/navigation';

type Variant = 'main' | 'explores' | 'feeds' | 'teams';

const LinkCol = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  color: ${colors.Grayscale[13]};
  column-gap: 2.06rem;
  ${typography.Heading20}
`;

const StyledParagraph = styled.p<{ $variant?: Variant }>`
  padding: 1rem 0rem;
  color: ${({ $variant }) => ($variant ? colors.Primary[500] : 'inherit')};
  border-bottom: ${({ $variant }) =>
    $variant ? `1px solid ${colors.Primary[500]}` : 'none'};

  &:hover {
    color: ${colors.Primary[500]};
  }
`;

const determineVariant = (path: string): Variant | undefined => {
  if (path === '/' || path.startsWith('/curation')) return 'main';
  if (path.startsWith('/explores') || path.startsWith('/reviews'))
    return 'explores';
  if (['/feeds', '/mypage'].some((subpath) => path.startsWith(subpath)))
    return 'feeds';
  if (path.startsWith('/teams')) return 'teams';
};

export default function Tab() {
  const { setKeyword } = useSearchMountainStore();
  const pathname = usePathname();

  const currentVariant = determineVariant(pathname);

  const handleResetKeyword = () => {
    setKeyword('');
  };

  return (
    <div onClick={handleResetKeyword}>
      <LinkCol>
        <Link href="/" passHref>
          <StyledParagraph
            $variant={currentVariant === 'main' ? 'main' : undefined}
          >
            추천
          </StyledParagraph>
        </Link>
        <Link href="/explores" passHref>
          <StyledParagraph
            $variant={currentVariant === 'explores' ? 'explores' : undefined}
          >
            탐험
          </StyledParagraph>
        </Link>
        <Link href="/feeds" passHref>
          <StyledParagraph
            $variant={currentVariant === 'feeds' ? 'feeds' : undefined}
          >
            피드
          </StyledParagraph>
        </Link>
        <Link href="/teams" passHref>
          <StyledParagraph
            $variant={currentVariant === 'teams' ? 'teams' : undefined}
          >
            모임
          </StyledParagraph>
        </Link>
      </LinkCol>
    </div>
  );
}
