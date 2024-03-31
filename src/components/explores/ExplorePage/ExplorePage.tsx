'use client';

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import KakaoMap from '@/src/components/explores/ExplorePage/KakaoMap';
import MountainInfo from '@/src/components/shared/MountainInfo';
import ExploreFilterPanel from '@/src/components/explores/ExplorePage/ExploreFilterPanel';
import getMountainData from '@/src/components/explores/api/getMountainData';
import AutoSearchBar from '@/src/components/shared/AutoSearchBar';
import Tab from '@/src/components/shared/Tab';
import useSearchMountainStore from '@/src/store/useSearchMountainStore';
import useFilterMountainStore from '@/src/store/useFilterMountainStore';
import mountainDataProps from '@/src/types/mountainDataProps';
import { useEffect, useState } from 'react';

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
  position: relative;
  margin-bottom: 2rem;
  text-align: right;
  color: var(--MDS-GrayScale-13, #000);
  font-size: 1.16667rem;
  font-weight: 600;
  line-height: 1.66667rem;

  span:first-child {
    padding-right: 1.75rem;
  }
  &:before {
    content: '';
    width: 0.1rem;
    height: 1.5rem;
    background-color: var(--MDS-GrayScale-5, #d9d9d9);
    position: absolute;
    top: 0.1rem;
    right: 4.5rem;
  }
`;

const SortItem = styled.span`
  cursor: pointer;
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
  const { keyword, searchedMountain, setSearchedMountain } =
    useSearchMountainStore();
  const { filteredItems, setFilteredItems } = useFilterMountainStore();

  const { data: mountainList } = useQuery({
    queryKey: ['mountainList'],
    queryFn: () => getMountainData(),
  });

  const [allMountainList, setAllMountainList] = useState<mountainDataProps[]>(
    [],
  );

  useEffect(() => {
    if (mountainList) {
      setAllMountainList(mountainList);
    }
  }, [mountainList]);

  const [isSorting, setIsSorting] = useState(true);

  const sortListByName = (list: mountainDataProps[]) => {
    return [...list].sort((a, b) =>
      isSorting
        ? b.명산_이름.localeCompare(a.명산_이름)
        : a.명산_이름.localeCompare(b.명산_이름),
    );
  };

  const sortListByTeamNumber = (list: mountainDataProps[]) => {
    return [...list].sort((a, b) =>
      isSorting ? b.명산_높이 - a.명산_높이 : a.명산_높이 - b.명산_높이,
    );
  };

  const handleSortByName = () => {
    const sortedList = sortListByName(allMountainList);

    setAllMountainList(sortedList);

    if (filteredItems.length > 0) {
      const sortedFilterList = sortListByName(filteredItems);

      setFilteredItems(sortedFilterList);
    }

    setIsSorting(!isSorting);
  };

  // 추후 API 연동시에 모임 개수로 대체될 예정입니다.
  const handleSortByTeamNumber = () => {
    const sortedList = sortListByTeamNumber(allMountainList);

    setAllMountainList(sortedList);

    if (filteredItems.length > 0) {
      const filteredSortedList = sortListByTeamNumber(filteredItems);

      setFilteredItems(filteredSortedList);
    }

    setIsSorting(!isSorting);
  };

  return (
    <>
      <Container>
        <Tab variant="explores" />

        <SearchMountainArea>
          <MainTitle>대한민국 산 탐험하기</MainTitle>
          <AutoSearchBar
            type="search"
            setSearchedMountain={setSearchedMountain}
          />
          <KakaoMap
            type="explore"
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
              <SortItem onClick={handleSortByName}>가나다순</SortItem>
              <SortItem onClick={handleSortByTeamNumber}>인기순</SortItem>
            </MountainSortHeader>
            <MountainList>
              {keyword === '' ? (
                filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <MountainInfo key={item.X좌표} list={item} />
                  ))
                ) : (
                  allMountainList?.map((list) => (
                    <MountainInfo key={list.X좌표} list={list} />
                  ))
                )
              ) : (
                <MountainInfo list={searchedMountain} />
              )}
            </MountainList>
          </MountainListContainer>
        </SearchResultArea>
      </Container>
    </>
  );
}
