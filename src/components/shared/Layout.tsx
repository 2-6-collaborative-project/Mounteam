'use client';

import styled from 'styled-components';

const PaddingLayout = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 6.5rem;

  @media (max-width: 768px) {
    padding: 0 4rem;
  }

  @media (max-width: 480px) {
    padding: 0 2rem;
  }
`;

// const PaddingLayout = styled.div`
//   margin: 0 auto;
//   width: 524px;

//   @media (max-width: 768px) {
//   }

//   @media (max-width: 480px) {
//     width: 416px;
//   }
// `;

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <PaddingLayout>{children}</PaddingLayout>
    </div>
  );
}
