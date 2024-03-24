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
          'https://b957-118-32-35-58.ngrok-free.app/api/kakao',
          {
            authorizationCode: AUTHORIZATION_CODE,
          },
        );
      } catch (e) {
        throw new Error(`${e}`);
      }
    };

    fetchData();
  }, []);

  return <div>로그인 중입니다.</div>;
}
