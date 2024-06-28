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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterContainer = styled.div`
  width: 20rem;

  @media (max-width: 768px) {
    padding: 3.125rem 0rem;
    width: 100%;
  }
`;

const TeamListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5625rem;
  width: 100%;
`;

const TeamListHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  color: ${colors.Grayscale[7]};
  ${typography.Footnote14};
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

const Container = styled.div`
  padding-bottom: 5rem;
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

interface Team {
  teamId: number;
  mountain: string;
  title: string;
  departureDay: string;
  ageRange: string[];
  gender: string;
  createdDate: string;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('createdAt');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await defaultInstance.get('/teams', {
          params: {
            size: 1000,
          },
        });
        setTeams(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  const sortedTeams = useMemo(() => {
    const filteredTeams = teams.filter((team) =>
      team.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sorted = filteredTeams.sort((a, b) => {
      if (sortOrder === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      }
    });

    return sorted;
  }, [teams, searchTerm, sortOrder]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <Container>
      <Tab />
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
            {sortedTeams.length > 0 ? (
              sortedTeams.map((team) => (
                <TeamThumbnail key={team.teamId} team={team} />
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </TeamList>
        </TeamListContainer>
      </SearchResultArea>
    </Container>
  );
}

// 무한 스크롤 구현 코드
// 'use client';
// import { useState, useEffect, useMemo, useRef } from 'react';
// import styled from 'styled-components';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import Tab from '@/src/components/shared/Tab';
// import TeamFilterPanel from '@/src/components/teams/TeamFilterPanel';
// import TeamThumbnail from '@/src/components/shared/TeamThumbnail';
// import { SearchBar } from '@/src/components/shared/SearchBar';
// import { defaultInstance } from '@/src/lib/axiosInstance';
// import typography from '@/app/styles/typography';
// import { colors } from '@/app/styles/colors';

// const SearchBarContainer = styled.div`
//   padding: 5rem 0 3.75rem 0;
// `;

// const MainTitle = styled.h2`
//   display: flex;
//   padding-top: 1.87rem;
//   flex-direction: column;
//   align-items: flex-start;
//   color: ${colors.Grayscale[13]};
//   ${typography.Heading30};

//   @media (max-width: 768px) {
//     padding: 1.25rem 0 5rem 0;
//     ${typography.Heading24};
//   }
// `;

// const SearchResultArea = styled.div`
//   display: flex;
//   gap: 7.38rem;
//   margin-top: 6rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const FilterContainer = styled.div`
//   width: 20rem;

//   @media (max-width: 768px) {
//     padding: 3.125rem 0rem;
//     width: 100%;
//   }
// `;

// const TeamListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5625rem;
//   width: 100%;
// `;

// const TeamListHeader = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   color: ${colors.Grayscale[7]};
//   ${typography.Footnote14};
//   margin-left: auto;
// `;

// const TeamList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   column-gap: 1.5rem;
//   row-gap: 1.5625rem;
//   align-items: flex-start;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//   }

//   @media (max-width: 480px) {
//     grid-template-columns: repeat(1, 1fr);
//   }
// `;

// const Container = styled.div`
//   padding-bottom: 5rem;
// `;

// interface SortButtonProps {
//   $active: boolean;
// }

// const SortButton = styled.button<SortButtonProps>`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: ${(props) =>
//     props.$active ? colors.Grayscale[13] : colors.Grayscale[7]};
//   ${typography.Footnote14};

//   &:focus {
//     outline: none;
//   }
// `;

// interface Team {
//   teamId: number;
//   mountain: string;
//   title: string;
//   departureDay: string;
//   ageRange: string[];
//   gender: string;
//   createdAt: string;
// }

// interface TeamPage {
//   teams: Team[];
//   hasNext: boolean;
// }

// export default function TeamsPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortOrder, setSortOrder] = useState('createAt');
//   const {
//     data: teamData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery<TeamPage>({
//     queryKey: ['teams', searchTerm, sortOrder],
//     queryFn: async ({ pageParam = 0 }) => {
//       const params = {
//         page: pageParam,
//         size: 12,
//         sort: sortOrder === 'title' ? 'title' : 'createAt',
//       };
//       const response = await defaultInstance.get('/teams', { params });
//       return response.data.data;
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       return lastPage.hasNext ? allPages.length : undefined;
//     },
//     initialPageParam: 0,
//   });

//   const teams = useMemo(() => {
//     if (teamData) {
//       const processedTeams = teamData.pages
//         .flatMap((page) => (Array.isArray(page) ? page : page.teams))
//         .filter((team) => team !== undefined) as Team[];
//       return processedTeams;
//     }
//     return [];
//   }, [teamData]);

//   const bottomObserver = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!bottomObserver.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1.0 },
//     );

//     observer.observe(bottomObserver.current);

//     return () => {
//       if (bottomObserver.current) {
//         observer.unobserve(bottomObserver.current);
//       }
//     };
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   return (
//     <Container>
//       <Tab />
//       <MainTitle>전체 등산 모임</MainTitle>
//       <SearchBarContainer>
//         <SearchBar
//           placeholder="함께 등산할 모임을 찾아보세요."
//           onSearch={(value) => setSearchTerm(value)}
//         />
//       </SearchBarContainer>
//       <SearchResultArea>
//         <FilterContainer>
//           <TeamFilterPanel />
//         </FilterContainer>
//         <TeamListContainer>
//           <TeamListHeader>
//             <SortButton
//               onClick={() => setSortOrder('title')}
//               $active={sortOrder === 'title'}
//             >
//               가나다순
//             </SortButton>
//             <p> | </p>
//             <SortButton
//               onClick={() => setSortOrder('createAt')}
//               $active={sortOrder === 'createAt'}
//             >
//               최신순
//             </SortButton>
//           </TeamListHeader>
//           <TeamList>
//             {teams.map((team: Team) => (
//               <TeamThumbnail key={team.teamId} team={team} />
//             ))}
//           </TeamList>
//           <div ref={bottomObserver} style={{ height: 1, width: '100%' }}></div>
//         </TeamListContainer>
//       </SearchResultArea>
//     </Container>
//   );
// }
