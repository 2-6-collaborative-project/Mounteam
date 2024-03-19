import Script from 'next/script';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import StyledComponentsRegistry from '../src/lib/registry';
import { ConfigProvider } from 'antd';
import GlobalStyle from '@/app/styles/globals';
const myFont = localFont({
  src: './styles/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'Mounteam',
  description:
    '100대 명산 정보 제공, 등산 코스 추천과 함께 소셜 모임, 뱃지 시스템 등의 경험 공유를 제공하는 등산 커뮤니티 플랫폼',
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <html lang="en" className={myFont.className}>
        {/* AntdRegistry 적용 -> nextjs에서 깜빡임 증상 없앤다고 합니다 */}
        <AntdRegistry>
          <body>
            <Script
              strategy="beforeInteractive"
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`}
            ></Script>
            {/* 폰트 적용 */}
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: myFont.style.fontFamily,
                },
              }}
            >
              {/* styled component 을 server component에 적용할 수 있게 세팅하는 것 */}
              <StyledComponentsRegistry>
                <GlobalStyle />
                {children}
              </StyledComponentsRegistry>
            </ConfigProvider>
          </body>
        </AntdRegistry>
      </html>
    </>
  );
}
