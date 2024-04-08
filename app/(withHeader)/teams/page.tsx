'use client';

import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import TeamFilterPanel from '@/src/components/teams/TeamFilterPanel';
import TeamThumbnail from '@/src/components/shared/TeamThumbnail';
import { SearchBar } from '@/src/components/shared/SearchBar';
import { defaultInstance } from '@/src/lib/axiosInstance';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

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
  margin-left: auto;
`;

const TeamList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1.5rem;
  row-gap: 1.5625rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

interface SortButtonProps {
  $active: boolean;
}

const SortButton = styled.button<SortButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.$active ? colors.Grayscale[13] : colors.Grayscale[7]};
  ${typography.Footnote14};

  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  padding-bottom: 5rem;
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

interface Team {
  teamId: number;
  mountain: string;
  title: string;
  departureDay: string;
  ageRange: string[];
  gender: string;
  createdDate: number;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('createdAt');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await defaultInstance.get('/teams');
        setTeams(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  const sortedTeams = useMemo(() => {
    const sorted = [...teams]
      .filter((team) =>
        team.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortOrder === 'title') {
          return a.title.localeCompare(b.title);
        } else {
          return (
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
          );
        }
      });

    return sorted;
  }, [teams, searchTerm, sortOrder]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Container>
        <Tab variant="teams" />
        <MainTitle>전체 등산 모임</MainTitle>
        <SearchBarContainer>
          <SearchBar
            placeholder="함께 등산할 모임을 찾아보세요."
            onSearch={handleSearch}
          />
        </SearchBarContainer>
        <SearchResultArea>
          <FilterContainer>
            <TeamFilterPanel />
          </FilterContainer>
          <TeamListContainer>
            <TeamListHeader>
              <SortButton
                onClick={() => setSortOrder('title')}
                $active={sortOrder === 'title'}
              >
                가나다순
              </SortButton>
              <p> | </p>
              <SortButton
                onClick={() => setSortOrder('createdAt')}
                $active={sortOrder === 'createdAt'}
              >
                최신순
              </SortButton>
            </TeamListHeader>
            <TeamList>
              {sortedTeams.map((team) => (
                <TeamThumbnail key={team.teamId} team={team} />
              ))}
            </TeamList>
          </TeamListContainer>
        </SearchResultArea>
      </Container>
    </>
  );
}
