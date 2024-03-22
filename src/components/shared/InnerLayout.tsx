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

// const innerLayout = styled.div`
//   margin: 0 auto;
//   padding: 6.5rem 0;

//   @media (max-width: 768px) {
//     padding: 4rem 0;
//   }

//   @media (max-width: 480px) {
//     padding: 2rem 0;
//   }
// `;

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
