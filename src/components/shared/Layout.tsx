'use client';

import styled from 'styled-components';

const InnerLayout = styled.div`
  margin: 0 auto;
  width: 992px;

  @media (max-width: 768px) {
    width: 640px;
  }

  @media (max-width: 480px) {
    width: 416px;
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

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <InnerLayout>{children}</InnerLayout>
    </div>
  );
}
