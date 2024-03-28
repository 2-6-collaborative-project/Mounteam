'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';
import TeamFilterPanel from '@/src/components/teams/TeamFilterPanel';
import TeamThumbnail from '@/src/components/shared/TeamThumbnail';
import { SearchBar } from '@/src/components/shared/SearchBar';
import { teamFeed } from '@/src/lib/mockData';

const SearchTeamArea = styled.div``;

const SearchBarContainer = styled.div`
  padding: 5rem 0 3.75rem 0;
`;

const MainTitle = styled.h2`
  display: flex;
  padding-top: 1.87rem;
  flex-direction: column;
  align-items: flex-start;
  color: ${colors.Grayscale[13]};
  ${typography.Heading30};

  @media (max-width: 768px) {
    padding: 1.25rem 0 5rem 0;
    ${typography.Heading24};
  }
`;

const SearchResultArea = styled.div`
  display: flex;
  gap: 7.38rem;
  margin-top: 6rem;
`;

const FilterContainer = styled.div`
  width: 20rem;

  @media (max-width: 768px) {
    padding: 3.125rem 0rem;
  }
`;

const TeamListContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 1.5625rem;
  width: 100%;
`;

const TeamListHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  color: ${colors.Grayscale[7]};
  ${typography.Footnote14};
  gap: 0.5rem;
  margin-left: auto; // TeamList 정렬 변경에 따라 오른쪽 정렬 방식 변경

  // 정렬 선택 시 색상 ${colors.Grayscale[13]}으로 변경 필요
`;

// 모임 리스트 렌더링하는 부분이라 탐험페이지와 다릅니다
const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.1875rem;
`;

interface SortButtonProps {
  active: boolean;
}

const SortButton = styled.button<SortButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.active ? colors.Grayscale[13] : colors.Grayscale[7]};
  ${typography.Footnote14};

  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  @media (max-width: 768px) {
    ${MainTitle} {
      font-size: 2rem;
      line-height: 2.5rem;
    }

    ${SearchResultArea} {
      flex-direction: column;
    }

    ${FilterContainer} {
      width: 100%;
    }
  }
`;

export default function TeamsPage() {
  const [teams, setTeams] = useState([...teamFeed]);
  const [filteredTeams, setFilteredTeams] = useState(teams);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('createdAt');

  useEffect(() => {
    let updatedTeams = teams.filter((team) =>
      team.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    updatedTeams = updatedTeams.sort((a, b) => {
      if (sortOrder === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });

    setFilteredTeams(updatedTeams);
  }, [searchTerm, sortOrder, teams]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Container>
        <Tab variant="teams" />
        <SearchTeamArea>
          <MainTitle>전체 등산 모임</MainTitle>
          <SearchBarContainer>
            <SearchBar placeholder="검색" onSearch={handleSearch} />
          </SearchBarContainer>
        </SearchTeamArea>

        <SearchResultArea>
          <FilterContainer>
            <TeamFilterPanel />
          </FilterContainer>

          <TeamListContainer>
            <TeamListHeader>
              <SortButton
                onClick={() => setSortOrder('title')}
                active={sortOrder === 'title'}
              >
                가나다순
              </SortButton>
              <p> | </p>
              <SortButton
                onClick={() => setSortOrder('createdAt')}
                active={sortOrder === 'createdAt'}
              >
                최신순
              </SortButton>
            </TeamListHeader>
            <TeamList>
              {filteredTeams.map((team) => (
                <TeamThumbnail key={team.teamId} team={team} />
              ))}
            </TeamList>
          </TeamListContainer>
        </SearchResultArea>
      </Container>
    </>
  );
}
