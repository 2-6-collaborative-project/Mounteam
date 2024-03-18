'use client';

import Profile from '@/src/components/mypage/Profile';
import Review from '@/src/components/review/Review';
import Avatar from '@/src/components/shared/Avatar';
import React from 'react';
import styled from 'styled-components';

const Test = styled.div`
  width: 100%;
  height: 100%;
  background: yellow;
`;
const Header = styled.div``;

const Nav = styled.div``;

const ContentsContainer = styled.div``;

const Menus = styled.div``;

const Footer = styled.div``;
export default function Mypage() {
  return (
    <>
      <Header />
      <Nav />
      <ContentsContainer>
        <Test>
          <Profile />
        </Test>
        <Menus />
      </ContentsContainer>
      <Review />
      <Footer />
    </>
  );
}
