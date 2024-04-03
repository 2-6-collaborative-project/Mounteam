/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com'], // 사용하고자 하는 호스트명 추가
  },
  compiler: {
    styledComponents: true,
  },
};
module.exports = nextConfig;
