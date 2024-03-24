'use client';

import { useEffect } from 'react';

export default function KakaoLogin() {
  useEffect(() => {
    const AUTHORIZATION_CODE: string = new URL(
      document.location.toString(),
    ).searchParams.get('code') as string;

    if (AUTHORIZATION_CODE) {
      console.log('Authorization code:', AUTHORIZATION_CODE);
    }
  }, []);

  return <div>로그인 중입니다.</div>;
}
