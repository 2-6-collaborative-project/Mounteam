'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import KakaoMap from '@/src/components/explore/KakaoMap';
import MountainInfo from '@/src/components/shared/MountainInfo';
import ExploreFilterPanel from '@/src/components/explore/ExploreFilterPanel';
import getMountainData from '@/src/components/explore/getMountainData';
import { AutoComplete, Input } from 'antd';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const SearchMountainArea = styled.div`
  margin-top: 7rem;
`;
const MainTitle = styled.h2`
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

export default function ExplorePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initKeyword = searchParams.get('mountain');

  const [keyword, setKeyword] = useState<string>(initKeyword || '');
  const [searchedMountain, setSearchedMountain] = useState(null);

  const { data: mountainList } = useQuery({
    queryKey: ['mountainList'],
    queryFn: () => getMountainData(),
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleInputChange = (value: string) => {
    setKeyword(value);
  };

  const options = mountainList?.map((list: any) => ({
    value: list.명산_이름,
  }));

  const handleSearch = (value: string) => {
    // URL 쿼리스트링 업데이트
    router.push(pathname + '?' + createQueryString('mountain', value));
    setKeyword(value);
  };

  const filteredOptions = options?.filter((option: any) =>
    option.value.includes(keyword),
  );

  useEffect(() => {
    if (initKeyword) {
      const searched = mountainList?.find(
        (list: any) => list.명산_이름 === initKeyword,
      );

      setSearchedMountain(searched);
    }
  }, [initKeyword, mountainList]);

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
              onSelect={handleSearch}
              onSearch={handleInputChange}
              value={keyword}
            >
              <Input.Search
                placeholder="대한민국 산 탐험하기"
                onSearch={handleSearch}
                enterButton
              />
            </AutoComplete>
          </SearchContainer>

          {
            <KakaoMap
              mountainList={mountainList}
              selectedMountain={searchedMountain}
            />
          }
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
              {initKeyword === '' &&
                mountainList?.map((list: any) => (
                  <MountainInfo key={list.X좌표} list={list} />
                ))}

              {/* /explore 처음 진입했을떄 */}
              {!initKeyword &&
                !searchedMountain &&
                mountainList?.map((list: any) => (
                  <MountainInfo key={list.X좌표} list={list} />
                ))}
              {/* 검색한 산이 있을때 */}
              {initKeyword && searchedMountain && (
                <MountainInfo list={searchedMountain} />
              )}

              {/* 검색한 산이 없을때 */}
              {initKeyword && !searchedMountain && (
                <div>검색 결과가 없습니다.</div>
              )}
            </MountainList>
          </MountainListContainer>
        </SearchResultArea>
      </Container>
    </>
  );
}
