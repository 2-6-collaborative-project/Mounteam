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
  padding: 1.25rem 2.9375rem;
  justify-content: center;
  align-items: center;
  gap: 0.8125rem;
  border-radius: 0.1875rem;
  background: ${colors.Grayscale[3]};
  ${typography.Heading16};
`;

const ImageSection = styled.div`
  width: 5.625rem;
  height: 5.625rem;
  background: ${colors.Grayscale[7]};
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
