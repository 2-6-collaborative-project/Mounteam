'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Button } from 'antd/es/radio';
import typography from '@/app/styles/typography';
import TeamThumbnail from '@/src/components/shared/TeamThumbnail';
import Tab from '@/src/components/shared/Tab';
import { teamFeed } from '@/src/lib/mockData';

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
  padding-bottom: 1.88rem;
  width: 100%;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* tab botton 확인을 위해서 임시 패딩 설정 */
  padding-top: 5rem;
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
`;

export default function Home() {
  return (
    <>
      <Body>
        <Tab variant="main" />
        <div>{/* 검색바 */}</div>
        <div>{/* 이미지 넘기는 섹션 */}</div>
        {/* 내비게이션 바 */}
        <div>
          <NavBar>
            <StyledLink href="/teams">
              <Button>등산 모임</Button>
            </StyledLink>
            <StyledLink href="/explores">
              <Button>100대 명산</Button>
            </StyledLink>
            {/* 아래 버튼은 추후 페이지 제작 후 링크 연결 */}
            <Button>지도 보기</Button>
            <Button>추천 코스</Button>
            <Button>초심자 추천</Button>
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
            {teamFeed.slice(0, 6).map((team) => (
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
