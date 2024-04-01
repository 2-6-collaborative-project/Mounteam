import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Input } from 'antd';
import getMountainData from '@/src/components/explores/api/getMountainData';
import TeamCreationForm from '@/src/types/teams/create/teamCreation';
import mountainDataProps from '@/src/types/mountainDataProps';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

const Container = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${colors.Grayscale[13]};

  .ant-input-affix-wrapper {
    padding: 0;
  }

  .ant-input {
    margin-left: 1.8rem;
  }
`;

const ErrorMessage = styled.div<{ $isVisible: boolean }>`
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  width: auto;
  height: fit-content;
  margin-top: 1rem;
  color: ${colors.System.Error};
  ${typography.Footnote12};
`;

interface MoutainSearchBarProps {
  placeholder: string;
  teamCreationFormData: TeamCreationForm;
  handleTeamCreationForm: (
    key: keyof TeamCreationForm,
    value: string | boolean,
  ) => void;
}

interface OptionType {
  value: string;
}

export default function MoutainSearchBar({
  placeholder,
  teamCreationFormData,
  handleTeamCreationForm,
}: MoutainSearchBarProps) {
  const [searchInput, setSearchInput] = useState('');
  const [isMountainSelected, setIsMountainSelected] = useState(false);

  const { data: mountainList } = useQuery({
    queryKey: ['mountainList'],
    queryFn: () => getMountainData(),
  });

  const options = mountainList?.map((list: mountainDataProps) => ({
    value: list.명산_이름,
  }));

  const filteredOptions = options?.filter((option: HTMLInputElement) =>
    option.value.includes(searchInput),
  );

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const onSelectMountain = (value: string) => {
    handleTeamCreationForm('mountain', value);
    setIsMountainSelected(true);
    setSearchInput(value);
  };

  useEffect(() => {
    const mountain = options?.map((option: OptionType) => option.value);
    const isInputIncluded = mountain?.includes(searchInput);

    if (isInputIncluded) {
      setIsMountainSelected(true);
    } else setIsMountainSelected(false);
  }, [searchInput, options]);

  useEffect(() => {
    if (isMountainSelected === true) {
      handleTeamCreationForm('mountain', searchInput);
    }
  }, [isMountainSelected, searchInput, handleTeamCreationForm]);

  return (
    <>
      <Container>
        <AutoComplete
          options={filteredOptions}
          onSelect={onSelectMountain}
          onSearch={handleSearchChange}
          notFoundContent="검색 결과가 없습니다."
          backfill
          style={{ width: '100%' }}
        >
          <Input
            placeholder={placeholder}
            variant="borderless"
            prefix={
              <Image width={20} height={20} src="/feedSearch.svg" alt="검색" />
            }
            style={{
              color: `${colors.Grayscale[13]}`,
              fontSize: '2rem',
              fontWeight: '400',
              lineHeight: '3.6rem',
            }}
          />
        </AutoComplete>
      </Container>
      <ErrorMessage $isVisible={searchInput.length > 0 && !isMountainSelected}>
        100대 명산에 포함되지 않는 산입니다.
      </ErrorMessage>
    </>
  );
}
