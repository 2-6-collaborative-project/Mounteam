'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import KakaoMap from '@/src/components/explore/ExplorePage/KakaoMap';
import MountainInfo from '@/src/components/shared/MountainInfo';
import ExploreFilterPanel from '@/src/components/explore/ExplorePage/ExploreFilterPanel';
import getMountainData from '@/src/components/explore/api/getMountainData';
import styled from 'styled-components';
import AutoSearchBar from '../../shared/AutoSearchBar';

const SearchMountainArea = styled.div``;
const MainTitle = styled.h2`
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

const MountainListHeader = styled.div`
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
`;

export default function ExplorePage() {
  const [searchedMountain, setSearchedMountain] = useState(null);

  const { data: mountainList } = useQuery({
    queryKey: ['mountainList'],
    queryFn: () => getMountainData(),
  });

  return (
    <>
      <Container>
        <div
          style={{
            height: '4.6rem',
            backgroundColor: '#ddd',
          }}
        >
          탭이 들어갈 자리입니다.
        </div>

        <SearchMountainArea>
          <MainTitle>대한민국 산 탐험하기</MainTitle>
          <AutoSearchBar setSearchedMountain={setSearchedMountain} />
          <KakaoMap
            mountainList={mountainList}
            selectedMountain={searchedMountain}
          />
        </SearchMountainArea>

        <SearchResultArea>
          <FilterContainer>
            <ExploreFilterPanel />
          </FilterContainer>

          <MountainListContainer>
            <MountainListHeader>
              <span>가나다순</span> <span>인기순</span>
            </MountainListHeader>

            <MountainList>
              {!searchedMountain ? (
                mountainList?.map((list: any) => (
                  <MountainInfo key={list.X좌표} list={list} />
                ))
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