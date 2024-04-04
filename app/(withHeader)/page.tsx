'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import TeamThumbnail from '@/src/components/shared/TeamThumbnail';
import Tab from '@/src/components/shared/Tab';
import NavButton from '@/src/components/main/NavButton';
import CarouselSection from '@/src/components/main/CarouselSection';
import AutoSearchBar from '@/src/components/shared/AutoSearchBar';
import typography from '@/app/styles/typography';
import { defaultInstance } from '@/src/lib/axiosInstance';
import FeedThumbnail from '@/src/components/main/FeedThumbnail';

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
  width: 100%;
  padding: 2.5rem 0rem 7.81rem 0rem;
  align-items: flex-start;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    gap: 0.625rem;
  }
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
  column-gap: 1.5rem;
  row-gap: 1.5625rem;
  padding-bottom: 7.5rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, auto);
  }
`;

const FeedThumbnailContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, auto);
  column-gap: 1.5rem;
  row-gap: 2.1875rem;
  padding-bottom: 7.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
  }

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 4.375rem;
  }
`;

interface Team {
  teamId: number;
  mountain: string;
  title: string;
  departureDay: string;
  ageRange: string[];
  gender: string;
}

interface Author {
  profileImageUrl: string;
  level: number;
  nickname: string;
}

interface Feed {
  author: Author;
  imageUrls?: string;
  id: number;
}

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [numTeams, setNumTeams] = useState(6);
  const [numFeeds, setNumFeeds] = useState(3);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await defaultInstance.get('/teams');
        console.log(response.data.data); // PR 업로드 전 삭제
        setTeams(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFeeds = async () => {
      try {
        const response = await defaultInstance.get('/feeds/main');
        if (response.status === 200 && response.data.data.content) {
          const feeds = response.data.data.content.map((feed: any) => ({
            author: {
              profileImageUrl: feed.author.profileImageUrl,
              level: feed.author.level,
              nickname: feed.author.nickname,
            },
            imageUrl: feed.imageUrl,
            id: feed.feedId,
            createdByme: feed.createdByMe,
          }));
          console.log(feeds); // PR 업로드 전 삭제
          setFeeds(feeds);
        } else {
          console.error('Unexpected response status or structure:', response);
        }
      } catch (error) {
        console.error('Failed to fetch feeds:', error);
      }
    };

    fetchTeams();
    fetchFeeds();

    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setNumTeams(4);
        setNumFeeds(2);
      } else if (window.innerWidth <= 768) {
        setNumTeams(6);
        setNumFeeds(6);
      } else {
        setNumTeams(6);
        setNumFeeds(3);
      }
    };

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

        <NavBar>
          <NavButton href="/teams" imageSrc="/adventure.svg">
            <p>전체 모임</p>
          </NavButton>
          <NavButton href="/teams" imageSrc="/mountains.svg">
            <p>100대 명산</p>
          </NavButton>
          {/*추후 페이지 제작 후 링크연결 */}
          <NavButton href="/" imageSrc="/map.svg">
            <p>지도 보기</p>
          </NavButton>
          <NavButton href="/curation/season" imageSrc="/fan.svg">
            <p>계절별 명산</p>
          </NavButton>
          {/*추후 페이지 제작 후 링크연결 */}
          <NavButton href="/" imageSrc="/rainbow.svg">
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
          {teams.slice(0, numTeams).map((team) => (
            <TeamThumbnail key={team.teamId} team={team} />
          ))}
        </TeamThumbnailContainer>
        <Between>
          <p>#등반후기</p>
          <StyledLink href="/feeds">
            <p>전체보기</p>
          </StyledLink>
        </Between>
        <FeedThumbnailContainer>
          {feeds.slice(0, numFeeds).map((feed) => (
            <FeedThumbnail key={feed.id} feed={feed} />
          ))}
        </FeedThumbnailContainer>
      </Body>
    </>
  );
}
