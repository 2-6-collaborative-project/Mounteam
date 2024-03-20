'use client';

import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import MountainInfo from '../shared/MountainInfo';
import { Checkbox } from 'antd';
import type { CheckboxProps, GetProp } from 'antd';

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

interface type {
  type: 'main' | 'sub';
}

const FilterHeader = styled.div<type>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: ${(props) =>
    props.type === 'main'
      ? '1px solid var(--MDS-GrayScale-5, #d9d9d9)'
      : 'none'};
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
  border-bottom: 1px solid var(--MDS-GrayScale-5, #d9d9d9);
`;

const CollapseButton = styled.button`
  width: 1rem;
  height: 1rem;
  background: url('./arrowUp.svg') no-repeat center center;
  background-size: cover;
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

const CheckboxGroupContainer = styled.div`
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  span {
    font-size: 1.16667rem;
    font-weight: 600;
    line-height: 1.66667rem;
  }
`;

const Container = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  padding: 0 1rem;

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

    ${CheckboxGroupContainer} {
      .ant-checkbox-group {
        flex-direction: row;
      }
    }
  }

  @media (max-width: 480px) {
    max-width: 40rem;

    ${MountainList} {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 40rem));

  }
`;

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

const CheckboxGroup = Checkbox.Group;

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

export default function ExplorePage() {
  const [regionCheckedList, setRegionCheckedList] =
    useState<CheckboxValueType[]>();
  const [regionCheckAll, setRegionCheckAll] = useState<boolean>(true);

  const [heightCheckedList, setHeightCheckedList] = useState<
    CheckboxValueType[]
  >([]);
  const [heightCheckAll, setHeightCheckAll] = useState<boolean>(false);

  const onRegionChange = (
    list: CheckboxValueType[],
    setCheckAllState: Function,
  ) => {
    setRegionCheckedList(list);
    setCheckAllState(list.length === regionOptions.length);
  };

  const onRegionCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setRegionCheckedList(e.target.checked ? regionOptions : []);
    setRegionCheckAll(e.target.checked);
  };

  const onHeightChange = (
    list: CheckboxValueType[],
    setCheckAllState: Function,
  ) => {
    setHeightCheckedList(list);
    setCheckAllState(list.length === heightOptions.length);
  };

  const onHeightCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setHeightCheckedList(e.target.checked ? heightOptions : []);
    setHeightCheckAll(e.target.checked);
  };

  return (
    <>
      <Container>
        <div
          style={{
            height: '5.7rem',
            backgroundColor: '#ddd',
            marginBottom: '0.4rem',
          }}
        >
          헤더가 들어갈 자리입니다.
        </div>
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
          <div
            style={{
              height: '4.7rem',
              backgroundColor: '#ddd',
            }}
          >
            검색창이 들어갈 자리입니다.
          </div>
          <SearchTagContainer>
            <SearchTag>Tag1</SearchTag>
            <SearchTag>Tag2</SearchTag>
            <SearchTag>Tag3</SearchTag>
          </SearchTagContainer>
          <KakaoMap />
        </SearchMountainArea>

        <SearchResultArea>
          <FilterContainer>
            <FilterHeader type={'main'}>
              <FilterTitle>필터</FilterTitle>
              <FilterReset>
                <ResetImage />
                <ResetTitle>초기화</ResetTitle>
              </FilterReset>
            </FilterHeader>
            <FilterContents>
              <FilterHeader type={'sub'}>
                <FilterTitle>관심지역</FilterTitle>
                <CollapseButton />
              </FilterHeader>

              <CheckboxGroupContainer>
                <Checkbox
                  onChange={onRegionCheckAllChange}
                  checked={regionCheckAll}
                >
                  전체 선택
                </Checkbox>

                <CheckboxGroup
                  options={regionOptions}
                  value={regionCheckedList}
                  onChange={(list) => onRegionChange(list, setRegionCheckAll)}
                />
              </CheckboxGroupContainer>
            </FilterContents>
            <FilterContents>
              <FilterHeader type="sub">
                <FilterTitle>높이</FilterTitle>
                <CollapseButton />
              </FilterHeader>
              <CheckboxGroupContainer>
                <Checkbox
                  onChange={onHeightCheckAllChange}
                  checked={heightCheckAll}
                >
                  전체 선택
                </Checkbox>
                <CheckboxGroup
                  options={heightOptions}
                  value={heightCheckedList}
                  onChange={(list) => onHeightChange(list, setHeightCheckAll)}
                ></CheckboxGroup>
              </CheckboxGroupContainer>
            </FilterContents>
          </FilterContainer>

          <MountainListContainer>
            <MountainListHeader>
              <span>가나다순</span> <span>인기순</span>
            </MountainListHeader>
            <MountainList>
              <MountainInfo />
              <MountainInfo />
              <MountainInfo />
              <MountainInfo />
              <MountainInfo />
              <MountainInfo />
            </MountainList>
          </MountainListContainer>
        </SearchResultArea>
      </Container>
    </>
  );
}
