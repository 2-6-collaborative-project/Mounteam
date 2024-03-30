'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { CustomPopover } from './CustomPopover';

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 82%;
  margin: 0 auto;
  max-width: 1200px;
  padding: 4rem 0rem 3.75rem 0rem;
  align-items: center;

  @media (max-width: 768px) {
  }

  @media (max-width: 480px) {
  }
`;

const LogoContainer = styled.div`
  display: flex;
`;

const IconGap = styled.div`
  display: flex;
  gap: 1.25rem;
`;

// 추후 popover 컴포넌트 edit icon에 연결 필요
export default function Header() {
  return (
    <HeaderBox>
      <LogoContainer>
        <Link href="/" passHref>
          <Image
            src="/logo.svg"
            alt="logo icon"
            width={105.625}
            height={35.505}
            priority
          />
        </Link>
      </LogoContainer>
      <IconGap>
        <CustomPopover
          content={
            <div>
              <p>
                <Link href="/teams/create">모임 생성</Link>
              </p>
              <p>
                <Link href="/teams/write">모임 후기 등록</Link>
              </p>
              <p>
                <Link href="/explores/reviews">등반 후기 등록</Link>
              </p>
            </div>
          }
        >
          <Image
            src="/edit.svg"
            alt="edit icon"
            width={24}
            height={24}
            priority
          />
        </CustomPopover>

        {/* 알림 아이콘 임시 삭제 */}
        {/* <Image
          src="/bell.svg"
          alt="bell icon"
          width={24}
          height={24}
          priority
        /> */}

        <CustomPopover
          content={
            <div>
              <p>로그아웃</p>
              <p>
                <Link href="/mypage">마이페이지</Link>
              </p>
            </div>
          }
        >
          <Image
            src="/user.svg"
            alt="user icon"
            width={24}
            height={24}
            priority
          />
        </CustomPopover>
      </IconGap>
    </HeaderBox>
  );
}
