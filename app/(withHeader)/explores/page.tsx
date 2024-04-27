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
import { defaultInstance } from '@/src/lib/axiosInstance';
import { EXPLORE_URL } from '@/src/utils/apiUrl';

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
    queryFn: () => getMountainList(0, 100, 'name'),
  });

  const {
    data: mountainData,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['mountainList', 'scroll'],
    queryFn: ({ pageParam = 0 }) => getMountainList(0, 6, 'name', pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const lastItemId = lastPage[lastPage.length - 1].exploreId;
      return lastItemId + 1;
    },
  });

  const mountainScrollData = mountainData?.pages?.flat() ?? [];

  const fetchNextMountainList = () => {
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
          fetchNextMountainList();
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
  const [sortOrder, setSortOrder] = useState('name');

  const handleSortMountain = async (e: any) => {
    const res = await defaultInstance.get(`${EXPLORE_URL}`, {
      params: {
        page: 0,
        size: 100,
        orderBy: e.target.textContent === '가나다순' ? 'name' : 'popular',
      },
    });

    const sortedMountain = res.data.data;
    setFilteredItems(sortedMountain);

    e.target.textContent === '가나다순'
      ? setSortOrder('name')
      : setSortOrder('popular');
  };

  return (
    <Container>
      <Tab variant="explores" />

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
            <SortItem
              $active={sortOrder === 'name'}
              onClick={handleSortMountain}
            >
              가나다순
            </SortItem>
            <p> | </p>
            <SortItem
              $active={sortOrder === 'popular'}
              onClick={handleSortMountain}
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
