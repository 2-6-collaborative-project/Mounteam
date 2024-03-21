'use client';

import styled from 'styled-components';

const PaddingLayout = styled.div`
  margin: 0 auto;
  width: 992px;

  @media (max-width: 768px) {
    width: 640px;
  }

  @media (max-width: 480px) {
    width: 416px;
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
