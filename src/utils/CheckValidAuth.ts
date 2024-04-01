'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { authInstance } from '@/src/lib/axiosInstance';

export default function CheckValidAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const checkTokenValidity = async () => {
      try {
        // 1. 페이지 이동시에 엑세스 토큰, 리프레쉬 토큰이 있는지 검사
        if (accessToken && refreshToken) {
          // 2. 둘다 있다면 uer/profile 로 HTTP 요청 헤더에 토큰을 담아 get 요청
          await authInstance.get('/user/profile');

          //3. 토큰이 유효하면 페이지 입장 (return true를 쓰려고 했지만 아무 코드도 안써도 될 것같아서 비워놨습니다.)
        } else {
          // 4. 토큰이 둘 중에 하나라도 없는 경우가 발생한다면 로그인 페이지로 리다이렉트
          router.push('/signin');
        }
      } catch (e) {
        // 5. 2번에서 토큰 만료로 에러 상태를 받으면(토큰 만료시 401 상태값 반환) 로그인 페이지로 리다이렉트
        router.push('/signin');
      }
    };

    checkTokenValidity();
  }, [pathname, searchParams]);

  return null;
}
