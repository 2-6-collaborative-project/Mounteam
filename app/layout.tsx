import type { Metadata } from 'next';
import GlobalStyle from './styles/globals';

export const metadata: Metadata = {
  title: 'Mounteam',
  description:
    '100대 명산 정보 제공, 등산 코스 추천과 함께 소셜 모임, 뱃지 시스템 등의 경험 공유를 제공하는 등산 커뮤니티 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalStyle />
      <body>{children}</body>
    </html>
  );
}
