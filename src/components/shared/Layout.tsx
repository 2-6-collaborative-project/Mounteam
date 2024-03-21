'use client';

import styled from 'styled-components';

const InnerLayout = styled.div`
  margin: 0 auto;
  width: clamp(639px, calc(100% - 130px), 992px);

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 4rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    min-width: 350px;
    padding: 0 2rem;
  }
`;

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <InnerLayout>{children}</InnerLayout>;
}
