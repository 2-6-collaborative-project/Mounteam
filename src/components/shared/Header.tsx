'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import Tab from './Tab';

const HeaderBox = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 0rem 3.75rem 0rem;
  align-items: center;
`;

const IconGap = styled.div`
  display: flex;
  gap: 1.25rem;
`;
// 얘도 router 쓰지말고 type 지정해서 default가 수정 아이콘까지 보이는거, main만 수정아이콘 가리는걸로 하자

export default function Header() {
  return (
    <div>
      <HeaderBox>
        <Image src="/logo.svg" alt="logo icon" width={169} height={56.81} />
        <IconGap>
          <Image src="/bell.svg" alt="bell icon" width={24} height={24} />
          <Link href="/mypage">
            <Image src="/user.svg" alt="user icon" width={24} height={24} />
          </Link>
        </IconGap>
      </HeaderBox>
    </div>
  );
}
