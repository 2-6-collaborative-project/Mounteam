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

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          if (!res.data.data.isNewUser) router.push('/');

          router.push('/preference');
        }
      } catch (e) {
        throw new Error(`${e}`);
      }
    };

    fetchData();
  }, []);

  return <div>로그인 중입니다.</div>;
}
