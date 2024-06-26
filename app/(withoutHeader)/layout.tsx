import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import StyledComponentsRegistry from '@/src/lib/registry';
import { ConfigProvider } from 'antd';
import GlobalStyle from '@/app/styles/globals';
import InnerLayout from '@/src/components/shared/InnerLayout';
import { colors } from '@/app/styles/colors';

const myFont = localFont({
  src: '../styles/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: '마운팀',
  description:
    '100대 명산 정보 제공, 등산 코스 추천과 함께 소셜 모임, 뱃지 시스템 등의 경험 공유를 제공하는 등산 커뮤니티 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={myFont.className}>
      {/* AntdRegistry 적용 -> nextjs에서 깜빡임 증상 없애기 */}
      <AntdRegistry>
        <body>
          {/* 폰트 적용 */}
          <ConfigProvider
            theme={{
              token: {
                fontFamily: myFont.style.fontFamily,
                colorPrimary: colors.Primary[500],
              },
            }}
          >
            {/* styled component를 server component에 적용할 수 있게 세팅 */}
            <StyledComponentsRegistry>
              <InnerLayout>
                <GlobalStyle />
                {children}
              </InnerLayout>
            </StyledComponentsRegistry>
          </ConfigProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}
