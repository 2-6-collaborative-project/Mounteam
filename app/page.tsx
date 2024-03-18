'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Button } from 'antd/es/radio';
import Header from '@/src/components/shared/Header';
import TeamThumbnail from '@/src/components/shared/TeamThumbnail';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* padding: 0 17.06rem 0 17.06rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  max-width: 1200px;

  @media (max-width: 768px) {
    padding: 0 7.44rem;
  }

  @media (max-width: 480px) {
    padding: 0 2rem;
  } */
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    <Body>
      <Header />
      <div>{/* 검색바 */}</div>
      <div>{/* 이미지 넘기는 섹션 */}</div>
      {/* 내비게이션 바 */}
      <div>
        <NavBar>
          <StyledLink href="/team">
            <Button>모임 보러가기</Button>
          </StyledLink>
          <StyledLink href="/explore">
            <Button>100대 명산 모음</Button>
          </StyledLink>
          {/* 아래 버튼은 추후 페이지 제작 후 링크 연결 */}
          <Button>지도 보기</Button>
          <Button>추천 코스</Button>
          <Button>초심자 추천</Button>
        </NavBar>
      </div>
      <div>
        <Between>
          <p>요즘 뜨는 등산 모임 Top 3</p>
          <StyledLink href="/team">
            <p>전체보기</p>
          </StyledLink>
        </Between>
        <TeamThumbnail />
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
    </Body>
  );
}
