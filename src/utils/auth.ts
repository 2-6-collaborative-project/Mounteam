'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function Auth() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        if (accessToken && refreshToken) {
          const response = await axios.post('api/user/me', {
            Authorization: `Bearer ${accessToken}`,
          });

          if (response.status === 200) {
            return true;
          } else {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      } catch (e) {
        console.log(e);
      }

      checkTokenValidity();
    };
  }, [pathname, searchParams]);

  return null;
}
