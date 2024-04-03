'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { colors } from '@/app/styles/colors';
import typography from '@/app/styles/typography';
import { HeaderPopover } from '../main/HeaderPopover';
import useSearchMountainStore from '@/src/store/useSearchMountainStore';

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

const StyledLink = styled(Link)`
  display: flex;
  padding: 0.5rem 1rem;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  background: ${colors.Grayscale[1]};
  box-shadow: 0px -1px 0px 0px ${colors.Grayscale[4]} inset;
  color: ${colors.Grayscale[13]};
  ${typography.Footnote14};

  &:last-child {
    box-shadow: none;
  }
`;

export default function Header() {
  const { setKeyword } = useSearchMountainStore();

  return (
    <HeaderBox>
      <LogoContainer>
        <Link href="/" passHref onClick={() => setKeyword('')}>
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
        <HeaderPopover
          content={
            <div>
              <StyledLink href="/teams/create">모임 생성</StyledLink>
              <StyledLink href="/explores/reviews">등반후기 등록</StyledLink>
              <StyledLink href="/teams/write">모임후기 등록</StyledLink>
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
        </HeaderPopover>

        {/* 알림 아이콘 임시 삭제 */}
        {/* <Image
          src="/bell.svg"
          alt="bell icon"
          width={24}
          height={24}
          priority
        /> */}

        <HeaderPopover
          content={
            <div>
              <StyledLink href="/">로그아웃</StyledLink>
              <StyledLink href="/mypage">마이페이지</StyledLink>
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
        </HeaderPopover>
      </IconGap>
    </HeaderBox>
  );
}
