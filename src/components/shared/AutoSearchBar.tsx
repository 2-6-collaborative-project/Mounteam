import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Input } from 'antd';
import styled from 'styled-components';
import getMountainData from '@/src/components/explores/api/getMountainData';
import { colors } from '@/app/styles/colors';
import useSearchMountainStore from '@/src/store/useSearchMountainStore';
import mountainDataProps from '@/src/types/mountainDataProps';

const SearchContainer = styled.div`
  padding: 0 0.8rem;
  border-bottom: 1px solid ${colors.Grayscale[13]};
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
  type: 'create' | 'search';
  setSearchedMountain?: (list: mountainDataProps) => void;
}

export default function AutoSearchBar({
  type,
  setSearchedMountain,
}: AutoSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initKeyword = searchParams.get('mountain');

  const { keyword, setKeyword } = useSearchMountainStore();

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

  const handleSearch = (
    value: string,
    option: {
      value: string;
    },
  ) => {
    if (type === 'search') {
      const searchLink =
        pathname === '/'
          ? pathname + 'explores?' + createQueryString('mountain', value)
          : pathname === '/explores'
            ? pathname + '?' + createQueryString('mountain', value)
            : '';

      router.push(`${searchLink}`);

      setKeyword(value);
    } else {
      if (setSearchedMountain !== undefined) {
        const selectedOption: any = option?.value;
        setSearchedMountain(selectedOption);
        setKeyword('');
      }
    }
  };

  const options = mountainList?.map((list: mountainDataProps) => ({
    value: list.명산_이름,
  }));

  const filteredOptions = options?.filter((option: HTMLInputElement) =>
    option.value.includes(keyword),
  );

  useEffect(() => {
    if (type === 'search' && initKeyword && setSearchedMountain) {
      const searched = mountainList?.find(
        (list: mountainDataProps) => list.명산_이름 === initKeyword,
      );
      setSearchedMountain(searched);
    }
  }, [initKeyword, mountainList, keyword]);

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
            <Image width={20} height={20} src="/feedSearch.svg" alt="검색" />
          }
          placeholder={
            type === 'search'
              ? '탐험하고 싶은 산을 찾아보세요.'
              : '다녀오셨던 산을 검색해보세요:)'
          }
          variant="borderless"
        />
      </AutoComplete>
    </SearchContainer>
  );
}
