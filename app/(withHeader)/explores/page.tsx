'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import KakaoMap from '@/src/components/explores/KakaoMap';
import MountainInfo from '@/src/components/shared/MountainInfo';
import ExploreFilterPanel from '@/src/components/explores/ExploreFilterPanel';
import AutoSearchBar from '@/src/components/shared/AutoSearchBar';
import Tab from '@/src/components/shared/Tab';
import useSearchMountainStore from '@/src/store/useSearchMountainStore';
import useFilterMountainStore from '@/src/store/useFilterMountainStore';
import mountainDataProps from '@/src/types/mountainDataProps';
import { useEffect, useRef, useState } from 'react';
import { colors } from '@/app/styles/colors';
import typography from '@/app/styles/typography';
import getMountainList from '@/src/components/explores/api/getMountainList';

const SearchMountainArea = styled.div``;
const MainTitle = styled.h2`
  margin-top: 2.5rem;
  margin-bottom: 5.8rem;
  font-size: 3rem;
  font-weight: 600;
  line-height: 4.2rem;
`;

const SearchResultArea = styled.div`
  display: flex;
  gap: 9rem;
  margin-top: 6rem;
`;

const FilterContainer = styled.div`
  width: 20rem;
`;

const MountainListContainer = styled.div``;

const MountainSortHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
  color: ${colors.Grayscale[7]};
`;

const SortItem = styled.span<{ $active: boolean }>`
  cursor: pointer;

  color: ${(props) =>
    props.$active ? colors.Grayscale[13] : colors.Grayscale[7]};
  ${typography.Footnote14};

  &:focus {
    outline: none;
  }
`;

const MountainList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 40rem));
  column-gap: 2rem;
  row-gap: 4rem;
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

  @media (max-width: 480px) {
    ${MountainList} {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 40rem));
    }
  }
`;

export default function ExplorePage() {
  const { data: mountainList } = useQuery({
    queryKey: ['mountainList'],
    queryFn: () => getMountainList(0, 100),
  });

  const {
    data: mountainData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['mountainList', 'scroll'],
    queryFn: ({ pageParam = 0 }) => getMountainList(0, 6, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const currentDataCount = pages.reduce(
        (total, page) => total + page.length,
        0,
      );
      return currentDataCount;
    },
  });

  const mountainScrollData = mountainData?.pages?.flat() ?? [];

  const fetchNextCardList = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const bottomObserver = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomObserver.current === null) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextCardList();
        }
      },
      { threshold: 0 },
    );

    const currentBottomObserver = bottomObserver.current;
    observer.observe(currentBottomObserver);

    return () => observer.unobserve(currentBottomObserver);
  }, [bottomObserver]);

  const { keyword, searchedMountain, setSearchedMountain } =
    useSearchMountainStore();
  const { filteredItems, setFilteredItems } = useFilterMountainStore();

  const [allMountainList, setAllMountainList] = useState<mountainDataProps[]>(
    [],
  );
  const [sortOrder, setSortOrder] = useState('name');

  useEffect(() => {
    if (mountainList) {
      setAllMountainList(mountainList);
    }
  }, [mountainList]);

  const sortListByName = (list: mountainDataProps[]) => {
    setSortOrder('name');
    return [...list].sort((a, b) => a.mountain.localeCompare(b.mountain));
  };

  const sortListByTeamNumber = (list: mountainDataProps[]) => {
    setSortOrder('teamNum');
    return [...list].sort((a, b) => b.teamCnt - a.teamCnt);
  };

  const handleSortByName = () => {
    const sortedList = sortListByName(allMountainList);

    setAllMountainList(sortedList);

    if (filteredItems.length > 0) {
      const sortedFilterList = sortListByName(filteredItems);

      setFilteredItems(sortedFilterList);
    }
  };

  // 추후 API 연동시에 모임 개수로 대체될 예정입니다.
  const handleSortByTeamNumber = () => {
    const sortedList = sortListByTeamNumber(allMountainList);

    setAllMountainList(sortedList);

    if (filteredItems.length > 0) {
      const filteredSortedList = sortListByTeamNumber(filteredItems);

      setFilteredItems(filteredSortedList);
    }
  };

  return (
    <Container>
      <Tab />

      <SearchMountainArea>
        <MainTitle>대한민국 산 탐험하기</MainTitle>
        <AutoSearchBar
          type="search"
          setSearchedMountain={setSearchedMountain}
        />
        <KakaoMap
          type="exploreMain"
          mountainList={mountainList}
          filteredItems={filteredItems}
        />
      </SearchMountainArea>

      <SearchResultArea>
        <FilterContainer>
          <ExploreFilterPanel />
        </FilterContainer>

        <MountainListContainer>
          <MountainSortHeader>
            <SortItem $active={sortOrder === 'name'} onClick={handleSortByName}>
              가나다순
            </SortItem>
            <p> | </p>
            <SortItem
              $active={sortOrder === 'teamNum'}
              onClick={handleSortByTeamNumber}
            >
              인기순
            </SortItem>
          </MountainSortHeader>
          <MountainList>
            {keyword === '' ? (
              filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <MountainInfo
                    key={item.exploreId}
                    type="explore"
                    list={item}
                  />
                ))
              ) : (
                mountainScrollData?.map((list: mountainDataProps) => (
                  <MountainInfo
                    key={list.exploreId}
                    type="explore"
                    list={list}
                  />
                ))
              )
            ) : (
              <MountainInfo type="explore" list={searchedMountain} />
            )}
          </MountainList>
        </MountainListContainer>
      </SearchResultArea>
      <div style={{ height: '0.1rem' }} ref={bottomObserver}></div>
    </Container>
  );
}
