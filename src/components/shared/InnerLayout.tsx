'use client';

import styled from 'styled-components';

const Layout = styled.div`
  width: 82%;
  margin: 0 auto;
  max-width: 1200px;

  @media (max-width: 768px) {
  }

  @media (max-width: 480px) {
  }
`;

interface LayoutProps {
  children?: React.ReactNode;
}

export default function InnerLayout({ children }: LayoutProps) {
  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
}
