import { useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Checkbox, Collapse } from 'antd';
import styled from 'styled-components';

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--MDS-GrayScale-5, #d9d9d9);
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
  color: var(--MDS-GrayScale-7, #8c8c8c);
`;
const FilterContents = styled.div`
  margin-top: 3.3rem;
`;

const CheckboxGroupContainer = styled.div`
  .ant-collapse-header {
    padding: 0 0 1rem 0 !important;
  }

  .ant-collapse-item {
    border-bottom: 1px solid var(--MDS-GrayScale-5, #d9d9d9);
  }

  .ant-collapse-item: nth-child(2) {
    margin-top: 2.5rem;
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

const regionOptions = [
  '서울',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주도',
];

const heightOptions = [
  '500m 미만',
  '500 ~ 1000m',
  '1000 ~ 1500m',
  '1500m 이상',
];

export default function ExploreFilterPanel() {
  const [regionCheckedList, setRegionCheckedList] = useState<string[]>([]);
  const [heightCheckedList, setHeightCheckedList] = useState<string[]>([]);

  const handleCheckboxListChange = (
    option: string,
    checkedList: string[],
    setCheckedList: (list: string[]) => void,
  ) => {
    const currentIndex = checkedList.indexOf(option);
    const newCheckedList = [...checkedList];

    if (currentIndex === -1) {
      newCheckedList.push(option);
    } else {
      newCheckedList.splice(currentIndex, 1);
    }

    setCheckedList(newCheckedList);
  };

  const handleCheckReset = () => {
    setRegionCheckedList([]);
    setHeightCheckedList([]);
  };

  const handleCheckAllChange = (
    e: CheckboxChangeEvent,
    option: string[],
    setCheckedList: (list: string[]) => void,
  ) => {
    setCheckedList(e.target.checked ? option : []);
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
            defaultActiveKey={['1', '2']}
            style={{
              paddingBottom: '1.17rem',
              fontSize: '1.3rem',
              fontWeight: '700',
              lineHeight: '3.2rem',
            }}
            items={[
              {
                key: '1',
                label: '관심지역',
                children: (
                  <>
                    <Checkbox
                      onChange={(e) =>
                        handleCheckAllChange(
                          e,
                          regionOptions,
                          setRegionCheckedList,
                        )
                      }
                      checked={
                        regionCheckedList.length === regionOptions.length
                      }
                    >
                      전체 선택
                    </Checkbox>
                    {regionOptions.map((option) => (
                      <Checkbox
                        key={option}
                        onChange={() =>
                          handleCheckboxListChange(
                            option,
                            regionCheckedList,
                            setRegionCheckedList,
                          )
                        }
                        checked={regionCheckedList.includes(option)}
                      >
                        {option}
                      </Checkbox>
                    ))}
                  </>
                ),
              },
              {
                key: '2',
                label: '높이',
                children: (
                  <>
                    <Checkbox
                      onChange={(e) =>
                        handleCheckAllChange(
                          e,
                          heightOptions,
                          setHeightCheckedList,
                        )
                      }
                      checked={
                        heightCheckedList.length === heightOptions.length
                      }
                    >
                      전체 선택
                    </Checkbox>
                    {heightOptions.map((option) => (
                      <Checkbox
                        key={option}
                        onChange={() =>
                          handleCheckboxListChange(
                            option,
                            heightCheckedList,
                            setHeightCheckedList,
                          )
                        }
                        checked={heightCheckedList.includes(option)}
                      >
                        {option}
                      </Checkbox>
                    ))}
                  </>
                ),
              },
            ]}
          />
        </CheckboxGroupContainer>
      </FilterContents>
    </>
  );
}
