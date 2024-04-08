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
        if (pathname === '/' || pathname === '/curation/season') {
          return true;
        } else if (accessToken && refreshToken) {
          const res = await authInstance.get('/user/profile');
          return true;
        } else {
          const confirmResult = window.confirm(
            '토큰이 만료되어 로그인 페이지로 이동합니다. 다시 로그인 해주세요.',
          );

          if (confirmResult) return router.push('/signin');
        }
      } catch (e) {
        const confirmResult = window.confirm(
          '토큰이 만료되어 로그인 페이지로 이동합니다. 다시 로그인 해주세요.',
        );
        if (confirmResult) return router.push('/signin');
      }
    };

    checkTokenValidity();
  }, [pathname, searchParams]);

  return null;
}
