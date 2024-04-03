'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { defaultInstance } from '@/src/lib/axiosInstance';

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

  return <div>로그인 중입니다.</div>;
}
