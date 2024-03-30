'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import Auth from '@/src/utils/auth';

export default function KakaoLogin() {
  const router = useRouter();
  useEffect(() => {
    const AUTHORIZATION_CODE: string = new URL(
      document.location.toString(),
    ).searchParams.get('code') as string;

    const fetchData = async () => {
      try {
        const res = await axios.post('https://www.mounteam.site/api/kakao', {
          authorizationCode: AUTHORIZATION_CODE,
        });

        if (res.data.statusCode === 200) {
          const accessToken = res.data.data.accessToken;
          const refreshToken = res.data.data.refreshToken;
          const expiresInSeconds = res.data.data.expiresIn;
          const expirationDate = new Date(Date.now() + expiresInSeconds * 1000);

          // document.cookie = `accessToken=${res.data.data.accessToken}; expires=${expirationDate.toUTCString()};`;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('expire', expirationDate.toString());
          localStorage.setItem('refreshToken', refreshToken);
          router.push('/');
        }
      } catch (e) {
        throw new Error(`${e}`);
      }
    };

    fetchData();
  }, []);

  return <div>로그인 중입니다.</div>;
}
