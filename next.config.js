/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 외부 이미지 도메인 허용
    domains: ['s3.ap-northeast-2.amazonaws.com'],
    // 특정 패턴을 가진 외부 이미지 URL 허용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.forest.go.kr',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
