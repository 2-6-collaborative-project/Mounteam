'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import KakaoMap from '@/src/components/explore/KakaoMap';
import MountainInfo from '@/src/components/shared/MountainInfo';
import ExploreFilterPanel from '@/src/components/explore/ExploreFilterPanel';
import getMountainData from '@/src/components/explore/getMountainData';
import { AutoComplete, Input } from 'antd';
const SearchMountainArea = styled.div`
  margin-top: 7rem;
`;
const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  line-height: 4.2rem;
`;

const SearchTagContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin: 2rem 0 4rem 0;
`;

const SearchTag = styled.span`
  padding: 0.1rem 0.8rem;
  border-radius: 0.2rem;
  border: 1px solid var(--Neutral-5, #d9d9d9);
  background: var(--Neutral-2, #fafafa);
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

const SearchContainer = styled.div`
  width: 400px;
  height: 45px;
  position: relative;
  border: 0;
  img {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const Search = styled.input`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  outline: none;
`;

const AutoSearchContainer = styled.div`
  z-index: 3;
  height: 50vh;
  width: 400px;
  background-color: #fff;
  position: absolute;
  top: 45px;
  border: 2px solid;
  padding: 15px;
`;

const AutoSearchWrap = styled.ul``;

const AutoSearchData = styled.li`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default function ExplorePage() {
  const [keyword, setKeyword] = useState<string>('');
  const [selectedMountain, setSelectedMountain] = useState(null);

  const { data: mountainList } = useQuery({
    queryKey: ['mountainList'],
    queryFn: () => getMountainData(),
  });

  const handleInputChange = (value: string) => {
    setKeyword(value);
  };

  const options = mountainList?.map((list: any) => ({
    value: list.명산_이름,
  }));

  const handleSelectMountain = (value: string) => {
    const selected = mountainList.find((list: any) => list.명산_이름 === value);

    setSelectedMountain(selected);
    setKeyword(value);
  };

  const filteredOptions = options?.filter((option: any) =>
    option.value.includes(keyword),
  );

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
          <SearchContainer>
            <AutoComplete
              options={filteredOptions}
              onSelect={handleSelectMountain}
              onSearch={handleInputChange}
              value={keyword}
            >
              <Input.Search
                placeholder="대한민국 산 탐험하기"
                enterButton
                onSearch={handleSelectMountain}
              />
            </AutoComplete>
          </SearchContainer>

          <KakaoMap
            mountainList={mountainList}
            selectedMountain={selectedMountain}
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
              {selectedMountain ? (
                <MountainInfo list={selectedMountain} />
              ) : (
                mountainList?.map((list: any) => (
                  <MountainInfo key={list.X좌표} list={list} />
                ))
              )}
            </MountainList>
          </MountainListContainer>
        </SearchResultArea>
      </Container>
    </>
  );
}
