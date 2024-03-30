'use client';

import axios from 'axios';
import { useEffect } from 'react';

export default function KakaoLogin() {
  useEffect(() => {
    const AUTHORIZATION_CODE: string = new URL(
      document.location.toString(),
    ).searchParams.get('code') as string;

    const fetchData = async () => {
      try {
        const res = await axios.post(
          'https://5cdc-118-32-35-58.ngrok-free.app/api/kakao',
          {
            authorizationCode: AUTHORIZATION_CODE,
          },
        );

        localStorage.setItem('accessToken', res.data.data.accessToken);
        localStorage.setItem('refreshToken', res.data.data.refreshToken);
      } catch (e) {
        throw new Error(`${e}`);
      }
    };

    fetchData();

    // const accessToken = document.cookie
    //   .split('; ')
    //   .find((row) => row.startsWith('accessToken='))
    //   ?.split('=')[1];
  }, []);

  return <div>로그인 중입니다.</div>;
}
