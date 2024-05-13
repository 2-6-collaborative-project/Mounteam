import { useState } from 'react';
import { Collapse } from 'antd';
import styled from 'styled-components';
import AgeFilter from '@/src/components/teams/AgeFilter';
import GenderFilter from '@/src/components/teams/GenderFilter';
import RegionFilter from '../explores/RegionFilter';
import DateFilter from '@/src/components/teams/DateFilter';
import { colors } from '@/app/styles/colors';

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.Grayscale[5]};
`;

const FilterTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 2.5rem;
`;

const FilterReset = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
`;

const ResetImage = styled.button`
  width: 1.6rem;
  height: 1.6rem;
  background: url('./filterReset.svg') no-repeat center center;
  background-size: cover;
`;

const ResetTitle = styled(FilterTitle)`
  color: ${colors.Grayscale[7]};
`;

const FilterContents = styled.div`
  margin-top: 3.3rem;
`;

const CheckboxGroupContainer = styled.div`
  .ant-collapse-header {
    padding: 0 0 1rem 0 !important;
  }

  .ant-collapse-header-text {
    font-weight: 700;
  }

  .ant-collapse-item {
    border-bottom: 1px solid ${colors.Grayscale[5]};
    margin-top: 1.875rem;
  }

  .ant-collapse-content-box {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 0 0 0 !important;
    margin-bottom: 1.17rem;
  }

  .ant-checkbox-inner {
    width: 1.3rem;
    height: 1.3rem;
  }

  .ant-checkbox-wrapper > span {
    font-size: 1.16rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .ant-collapse-content-box {
      display: block;
    }
  }
`;

export default function TeamFilterPanel() {
  const [ageCheckedList, setAgeCheckedList] = useState<string[]>([]);
  const [genderCheckedList, setGenderCheckedList] = useState<string[]>([]);
  const [regionCheckedList, setRegionCheckedList] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<[string, string]>([
    '',
    '',
  ]);

  const handleCheckReset = () => {
    setAgeCheckedList([]);
    setGenderCheckedList([]);
    setRegionCheckedList([]);
    setSelectedDateRange(['', '']);
  };

  return (
    <>
      <FilterHeader>
        <FilterTitle>필터</FilterTitle>
        <FilterReset onClick={handleCheckReset}>
          <ResetImage />
          <ResetTitle>초기화</ResetTitle>
        </FilterReset>
      </FilterHeader>

      <FilterContents>
        <CheckboxGroupContainer>
          <Collapse
            ghost={true}
            expandIconPosition="end"
            defaultActiveKey={['1', '2', '3', '4']}
            items={[
              {
                key: '1',
                label: '관심지역',
                children: (
                  <RegionFilter
                    regionCheckedList={regionCheckedList}
                    setRegionCheckedList={setRegionCheckedList}
                  />
                ),
              },
              {
                key: '2',
                label: '기간',
                children: (
                  <DateFilter handleDateChange={setSelectedDateRange} />
                ),
              },
              {
                key: '3',
                label: '나이',
                children: (
                  <AgeFilter
                    checkedList={ageCheckedList}
                    setCheckedList={setAgeCheckedList}
                  />
                ),
              },
              {
                key: '4',
                label: '성별',
                children: (
                  <GenderFilter
                    checkedList={genderCheckedList}
                    setCheckedList={setGenderCheckedList}
                  />
                ),
              },
            ]}
          />
        </CheckboxGroupContainer>
      </FilterContents>
    </>
  );
}
