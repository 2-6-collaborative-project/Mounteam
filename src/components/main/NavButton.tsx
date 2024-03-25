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
  padding: 0.625rem 3.0625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0.625rem;
  background: ${colors.Grayscale[3]};
  color: ${colors.Grayscale[13]};
  text-align: center;
  ${typography.Heading16};

  p {
    max-width: 100%;
    word-wrap: break-word;
  }

  @media (max-width: 768px) {
    padding: 0.625rem 2.25rem;
    ${typography.Footnote12};
  }

  @media (max-width: 480px) {
    padding: 0.625rem 1rem;
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
    <Link href={href} passHref>
      <NavButtonContainer>
        <ImageSection />
        {children}
      </NavButtonContainer>
    </Link>
  );
}
