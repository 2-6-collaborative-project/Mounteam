'use client';

import styled from 'styled-components';
import { colors } from '@/app/styles/colors';
import Image from 'next/image';

const FooterBox = styled.div`
  display: flex;
  width: 82%;
  margin: 0 auto;
  max-width: 1200px;
  padding: 9.375rem 0rem 2.1875rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FooterParagraph = styled.div`
  color: ${colors.Primary[500]};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
`;

export default function Footer() {
  return (
    <FooterBox>
      <Image src="/logo.svg" alt="logo" width={102} height={34.81} />
      <FooterContainer>
        <FooterParagraph>
          <p>이메일 : Mounteam@google.com</p>
        </FooterParagraph>
        <FooterParagraph>
          <p>Copyright ⓒ마운팀 All Rights Reserved.</p>
        </FooterParagraph>
      </FooterContainer>
    </FooterBox>
  );
}
