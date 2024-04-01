'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { colors } from '@/app/styles/colors';
import typography from '@/app/styles/typography';

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

const NavButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 3.0625rem;
  border-radius: 0.625rem;
  background: ${colors.Grayscale[3]};
  color: ${colors.Grayscale[13]};
  text-align: center;
  ${typography.Heading16};
  flex-grow: 1;
  flex-shrink: 1;

  p {
    max-width: 100%;
    word-wrap: break-word;
  }

  @media (max-width: 865px) {
    padding: 0.625rem 2.25rem;
  }

  @media (max-width: 768px) {
    ${typography.Footnote12};
  }

  @media (max-width: 480px) {
    padding: 0.625rem 1rem;
  }
`;

const NavButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  text-align: center;
  max-width: 4.5rem;

  @media (max-width: 768px) {
    max-width: 4rem;
  }

  @media (max-width: 480px) {
    max-width: 3.5rem;
  }
`;

const ImageSection = styled.div`
  width: 5.625rem;
  height: 5.625rem;
  background: ${colors.Grayscale[7]};

  @media (max-width: 768px) {
    width: 2.53125rem;
    height: 2.53125rem;
  }
`;

export default function NavButton({ href, children }: NavButtonProps) {
  return (
    <NavButtonContainer>
      <Link href={href} passHref>
        <NavButtonSection>
          <ImageSection />
          {children}
        </NavButtonSection>
      </Link>
    </NavButtonContainer>
  );
}
