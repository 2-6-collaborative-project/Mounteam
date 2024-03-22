'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import MountainInfo from '../shared/MountainInfo';
import ExploreFilterPanel from './ExploreFilterPanel';
import mountainData from './mountainData';
import Link from 'next/link';

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
  max-width: 100rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 64rem;

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
    max-width: 40rem;

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
  const [keyItems, setKeyItems] = useState<string[]>([]);
  const [allMountains, setAllMountains] = useState<string[]>([]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const searchData = async () => {
    const res = await mountainData();

    let autoCompletedData = res.filter(
      (list: any) => list.명산_이름.includes(keyword) === true,
    );

    setAllMountains(res);
    setKeyItems(autoCompletedData);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) searchData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

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
            <Search value={keyword} onChange={handleInputChange} />
            <AutoSearchContainer>
              <AutoSearchWrap>
                <AutoSearchData>
                  {keyItems.map((item: any) => (
                    <Link href="#" key={item.X좌표}>
                      {item.명산_이름}
                    </Link>
                  ))}
                </AutoSearchData>
              </AutoSearchWrap>
            </AutoSearchContainer>
          </SearchContainer>
          <SearchTagContainer>
            <SearchTag>Tag1</SearchTag>
            <SearchTag>Tag2</SearchTag>
            <SearchTag>Tag3</SearchTag>
          </SearchTagContainer>
          <KakaoMap />
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
              {allMountains.map((mountain: any) => (
                <MountainInfo key={mountain.X좌표} mountain={mountain} />
              ))}
            </MountainList>
          </MountainListContainer>
        </SearchResultArea>
      </Container>
    </>
  );
}
