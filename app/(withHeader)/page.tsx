'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import TeamThumbnail from '@/src/components/shared/TeamThumbnail';
import Tab from '@/src/components/shared/Tab';
import NavButton from '@/src/components/main/NavButton';
import CarouselSection from '@/src/components/main/CarouselSection';
import { teamFeed } from '@/src/lib/mockData';
import typography from '@/app/styles/typography';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10rem;
  width: 100%;
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${typography.Heading24};
  width: 100%;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* tab botton 확인을 위해서 임시 패딩 설정 */
  padding-top: 5rem;
  padding: 1.875rem 0rem;
  gap: 1.125rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  ${typography.Footnote16};

  &:hover {
    text-decoration: none;
  }

  p {
    margin: 0;
    color: inherit;
  }
`;

const TeamThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 1.44rem;
  padding-bottom: 7.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, auto);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, auto);
  }
`;

export default function Home() {
  const [numItems, setNumItems] = useState(6);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 480) {
        setNumItems(4);
      } else if (window.innerWidth <= 768) {
        setNumItems(3);
      } else {
        setNumItems(6);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Body>
        <Tab variant="main" />
        <div>{/* 검색바 */}</div>
        {/* <CarouselSection /> */}
        <div>
          <NavBar>
            <NavButton href="/teams">
              <p>등산 모임</p>
            </NavButton>
            <NavButton href="/teams">
              <p>100대 명산</p>
            </NavButton>
            {/* 아래 3개는 추후 페이지 제작 후 링크연결 */}
            <NavButton href="/">
              <p>지도 보기</p>
            </NavButton>
            <NavButton href="/">
              <p>추천 코스</p>
            </NavButton>
            <NavButton href="/">
              <p>초보 추천</p>
            </NavButton>
          </NavBar>
        </div>
        <div>
          <Between>
            <p>등산 같이가자</p>
            <StyledLink href="/teams">
              <p>전체보기</p>
            </StyledLink>
          </Between>
          <TeamThumbnailContainer>
            {teamFeed.slice(0, numItems).map((team) => (
              <TeamThumbnail key={team.teamId} team={team} />
            ))}
          </TeamThumbnailContainer>
        </div>
        <div>
          <Between>
            <p>#등반후기</p>
            <StyledLink href="/feeds">
              <p>전체보기</p>
            </StyledLink>
          </Between>
        </div>
        <footer></footer>
      </Body>
    </>
  );
}
