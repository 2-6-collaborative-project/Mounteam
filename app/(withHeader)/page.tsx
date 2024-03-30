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
import AutoSearchBar from '@/src/components/shared/AutoSearchBar';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10rem;
  width: 100%;
`;

const SearchBarContainer = styled.div`
  padding-top: 5rem;
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${typography.Heading24};
  padding-bottom: 2.5rem;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem 0rem 7.81rem 0rem;
  align-items: flex-start;
  gap: 1.25rem;
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
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 2.19rem;
  padding-bottom: 7.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 1.875rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, auto);
    gap: 0.9375rem;
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
        <SearchBarContainer>
          <AutoSearchBar type="search" />
        </SearchBarContainer>
        <CarouselSection />

        {/* 추후 NavButton 디자인 변경 예정 */}
        <NavBar>
          <NavButton href="/teams">
            <p>전체 모임</p>
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
            <p>초심자 추천</p>
          </NavButton>
        </NavBar>
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
        <Between>
          <p>#등반후기</p>
          <StyledLink href="/feeds">
            <p>전체보기</p>
          </StyledLink>
        </Between>
        <footer></footer>
      </Body>
    </>
  );
}
