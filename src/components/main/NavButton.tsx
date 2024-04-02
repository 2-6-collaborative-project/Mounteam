'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '@/app/styles/colors';
import typography from '@/app/styles/typography';

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
  imageSrc: string;
}

const NavButtonContainer = styled.div`
  display: flex;
  padding: 1.37rem 3.0625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0.625rem;
  background: ${colors.Grayscale[3]};
  flex-grow: 1;
  flex-shrink: 1;

  @media (max-width: 865px) {
    padding: 0.625rem 2.25rem;
  }

  @media (max-width: 480px) {
    padding: 0.625rem 1rem;
  }
`;

const NavButtonSection = styled.div`
  display: flex;
  width: 4.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: ${colors.Grayscale[13]};
  text-align: center;
  ${typography.Heading16};

  p {
    max-width: 100%;
    word-wrap: break-word;
  }

  @media (max-width: 768px) {
    ${typography.Footnote12};
    max-width: 4rem;
  }

  @media (max-width: 480px) {
    max-width: 3.5rem;
  }
`;

const ImageSection = styled.div`
  width: 7.2rem;
  height: 7.2rem;
  position: relative;

  @media (max-width: 768px) {
    width: 2.53125rem;
    height: 2.53125rem;
  }
`;

export default function NavButton({
  href,
  children,
  imageSrc,
}: NavButtonProps) {
  return (
    <NavButtonContainer>
      <Link href={href} passHref>
        <NavButtonSection>
          <ImageSection>
            <Image src={imageSrc} alt="Nav Button Image" fill />
          </ImageSection>
          {children}
        </NavButtonSection>
      </Link>
    </NavButtonContainer>
  );
}
