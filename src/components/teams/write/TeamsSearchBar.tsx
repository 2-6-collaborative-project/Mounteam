import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { AutoComplete, Input } from 'antd';
import styled from 'styled-components';
import { colors } from '@/app/styles/colors';
import useSearchMountainStore from '@/src/store/useSearchMountainStore';
import { useTeamsWriteStore } from '@/src/store/useTeamsWriteStore';

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

interface TeamsSearchBarProps {
  teamList: teamsData;
}

export default function TeamsSearchBar({ teamsList }: TeamsSearchBarProps) {
  const { setTitle, setPlace, setDate, setSearchResult } = useTeamsWriteStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initKeyword = searchParams.get('mountain');
  const { keyword, setKeyword } = useSearchMountainStore();

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

  const options = teamsList?.map((list: teamsData, index: number) => ({
    value: list.title,
    key: index.toString(),
    date: list.departureDay,
    mountain: list.mountain,
  }));

  const handleSearch = (
    value: string,
    option: {
      value: string;
      key: string;
      date: string;
      mountain: string;
    },
  ) => {
    const date = option.date.split(' ')[0].split('-');
    const dateResult = date[0].slice(2, 3) + date[1] + date[2];
    const selectedOption = option?.value;
    setTitle(selectedOption);
    setPlace(option.mountain);
    setDate(option.date.split(' ')[0]);
    setSearchResult(`${dateResult}_${option.mountain}_${selectedOption}`);
    setKeyword('');
  };

  const filteredOptions = options?.filter((option: HTMLInputElement) =>
    option.value?.includes(keyword),
  );

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
          placeholder="참여하신 모임을 검색해보세요."
          variant="borderless"
        />
      </AutoComplete>
    </SearchContainer>
  );
}
