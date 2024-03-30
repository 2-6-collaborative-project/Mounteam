'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import GlobalStyle from '@/app/styles/globals';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Logo = styled.div`
  position: relative;
  width: 27rem;
  height: 9rem;
`;

const Dsecription = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
`;

const Button = styled.button`
  width: 31.5rem;
  height: 6rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
`;

const Icon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const KakaoLogin = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fee500;

  ${Icon} {
    margin-right: 1.5rem;
  }
`;

const NaverLogin = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #03c75a;
  color: #fff;

  ${Icon} {
    width: 3.4rem;
    height: 3.4rem;
    margin-right: 1rem;
  }
`;

const Container = styled.div`
  margin: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Dsecription} {
    margin: 10rem 0 2.5rem 0;
  }
  ${KakaoLogin} {
    margin-bottom: 2rem;
  }
`;

function SignInPage() {
  const REDIRECT_URI = 'http://localhost:3000/oauth/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo>
          <Image fill src="/logo.svg" alt="로고" />
        </Logo>
        <Dsecription>SNS로 간편하게 로그인하기</Dsecription>

        <Link href={`${KAKAO_AUTH_URL}`}>
          <KakaoLogin>
            <Icon src="/kakaoLogo.svg" alt="카카오 로고" />
            카카오로 로그인 하기
          </KakaoLogin>
        </Link>
        <NaverLogin>
          <Icon src="/naverLogo.svg" alt="네이버 로고" />
          네이버로 로그인 하기
        </NaverLogin>
      </Container>
    </>
  );
}

export default SignInPage;
