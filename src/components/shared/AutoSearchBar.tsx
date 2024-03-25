import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Input } from 'antd';
import styled from 'styled-components';
import getMountainData from '@/src/components/explore/api/getMountainData';
import { colors } from '@/app/styles/colors';

const SearchContainer = styled.div`
  display: flex;
  max-width: 99.2rem;
  padding: 0 0.8rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-bottom: 1px solid ${colors.Grayscale[13]};
  margin: 0 auto;
  margin-bottom: 5rem;

  .ant-select {
    width: 100%;
  }

  .ant-input-affix-wrapper {
    width: 100%;
    height: 3rem;
    border: none;
  }

  .ant-input {
    margin-left: 0.8rem;
  }
`;

interface AutoSearchBarProps {
  setSearchedMountain?: React.Dispatch<React.SetStateAction<null>>;
}

export default function AutoSearchBar({
  setSearchedMountain,
}: AutoSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initKeyword = searchParams.get('mountain');
  const [keyword, setKeyword] = useState<string>(initKeyword || '');

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
    const searchLink =
      pathname === '/'
        ? pathname + 'explore?' + createQueryString('mountain', value)
        : pathname === '/explore'
          ? pathname + '?' + createQueryString('mountain', value)
          : '/404';

    router.push(`${searchLink}`);

    setKeyword(value);
  };

  const filteredOptions = options?.filter((option: any) =>
    option.value.includes(keyword),
  );

  useEffect(() => {
    if (initKeyword && setSearchedMountain) {
      const searched = mountainList?.find(
        (list: any) => list.명산_이름 === initKeyword,
      );

      setSearchedMountain(searched);
    }
  }, [initKeyword, mountainList]);

  return (
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
            <Image width={20} height={20} src="./feedSearch.svg" alt="검색" />
          }
          placeholder="탐험하고 싶은 산을 찾아보세요."
        />
      </AutoComplete>
    </SearchContainer>
  );
}
