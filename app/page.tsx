'use client';

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconGap = styled.div`
  display: flex;
  gap: 1.25rem;
`;

const Tab = styled.div`
  display: flex;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }

  p {
    margin: 0;
    color: inherit;
  }
`;

export default function Home() {
  return (
    <div>
      {/* 헤더부분 */}
      <div>
        <Between>
          <Image src="/logo.svg" alt="logo icon" width={169} height={56.81} />
          <IconGap>
            <Image src="/bell.svg" alt="bell icon" width={24} height={24} />
            <Link href="/mypage">
              <Image src="/user.svg" alt="user icon" width={24} height={24} />
            </Link>
          </IconGap>
        </Between>
        {/* 여기 아래 tab은 나중에 컴포넌트로 만들어야할 부분 */}
        <Tab>
          <StyledLink href="/">
            <p>추천</p>
          </StyledLink>
          <StyledLink href="/explore">
            <p>탐험</p>
          </StyledLink>
          <StyledLink href="/feed">
            <p>피드</p>
          </StyledLink>
          <StyledLink href="/team">
            <p>내 모임</p>
          </StyledLink>
        </Tab>
      </div>
      <div>{/* 검색바 */}</div>
      {/* 메인페이지 내용 부분 */}

      <div>{/* 이미지 넘기는 섹션 */}</div>
      <div>
        {/* 내비게이션 바 */}
        <NavBar>
          <StyledLink href="/team">
            <button>모임 보러가기</button>
          </StyledLink>
          <StyledLink href="/explore">
            <button>100대 명산 모음</button>
          </StyledLink>
          {/* 아래 버튼은 추후 페이지 제작 후 링크 연결 */}
          <button>지도 보기</button>
          <button>추천 코스</button>
          <button>초심자 추천</button>
        </NavBar>
      </div>
      <div>
        <Between>
          <p>요즘 뜨는 등산 모임 Top 3</p>
          <StyledLink href="/team">
            <p>전체보기</p>
          </StyledLink>
        </Between>
      </div>
      <div>
        <Between>
          <p>등반 후기</p>
          <StyledLink href="/feed">
            <p>전체보기</p>
          </StyledLink>
        </Between>
      </div>
      <footer></footer>
    </div>
  );
}
