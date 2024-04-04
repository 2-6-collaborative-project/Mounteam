'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { defaultInstance } from '@/src/lib/axiosInstance';
import { Spin } from 'antd';
import styled from 'styled-components';
import Image from 'next/image';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  height: 100vh;
`;

export default function KakaoLogin() {
  const router = useRouter();
  useEffect(() => {
    const AUTHORIZATION_CODE: string = new URL(
      document.location.toString(),
    ).searchParams.get('code') as string;

    const fetchData = async () => {
      try {
        const res = await defaultInstance.post('/kakao', {
          authorizationCode: AUTHORIZATION_CODE,
        });

        if (res.data.statusCode === 200) {
          localStorage.setItem('accessToken', res.data.data.accessToken);
          localStorage.setItem('refreshToken', res.data.data.refreshToken);

          if (!res.data.data.isNewUser) return router.push('/');

          return router.push('/preference');
        }
      } catch (e) {
        throw new Error(`${e}`);
      }
    };

    fetchData();
  }, []);

  return (
    <SpinnerContainer>
      <Image
        src="/logo.svg"
        alt="logo icon"
        width={105.625}
        height={35.505}
        priority
      />
      <Spin size="large" />
    </SpinnerContainer>
  );
}
