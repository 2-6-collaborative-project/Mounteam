'use client';

import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import KakaoMap from '@/src/components/explore/KakaoMap';
import MountainInfo from '@/src/components/shared/MountainInfo';
import ExploreFilterPanel from '@/src/components/explore/ExploreFilterPanel';
import getMountainData from '@/src/components/explore/getMountainData';
import styled from 'styled-components';
import { AutoComplete, Input } from 'antd';
import { colors } from '@/app/styles/colors';

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

const SearchContainer = styled.div`
  display: flex;
  max-width: 99.2rem;
  padding: 0 0.8rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-bottom: 1px solid ${colors.Grayscale[13]};
  margin: 0 auto;

  .ant-select {
    width: 100%;
  }

  .ant-input-affix-wrapper {
    position: relative;
    width: 100%;
    height: 3rem;
    padding-left: 3rem;
    padding: 0;
  }

  .ant-input-prefix {
    position: absolute;
    top: 0.5rem;
    left: 0;
  }
  .ant-input-prefix > img {
    position: static;
  }
`;

const Container = styled.div`
  ${SearchContainer} {
    margin-bottom: 5rem;
  }

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
              notFoundContent="검색 결과가 없습니다."
              value={keyword}
            >
              <Input
                prefix={
                  <Image
                    width={20}
                    height={20}
                    src="./feedSearch.svg"
                    alt="검색"
                  />
                }
                placeholder="탐험하고 싶은 산을 찾아보세요."
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
