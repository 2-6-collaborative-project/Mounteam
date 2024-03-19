'use client';

import { useState } from 'react';
import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import MountainInfo from '../shared/MountainInfo';
import { Checkbox, Divider } from 'antd';
import type { CheckboxProps, GetProp } from 'antd';

const Container = styled.div`
  margin: 3.2rem 10.4rem;
`;

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
  border-bottom: 1px solid var(--MDS-GrayScale-5, #d9d9d9);
`;

const FilterHeader = styled.div`
  display: flex;
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
const FavoriateRegion = styled.div``;

const SubTitle = styled.h3`
  margin-top: 4rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.8rem;
`;

const FilterOption = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;

  & > label {
    margin-left: 0.8rem;
    color: var(--character-title-85, rgba(0, 0, 0, 0.85));
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
  }
`;

const MountainList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, 30rem));
  column-gap: 2rem;
  row-gap: 4rem;
  width: 100rem;
`;

const CheckboxGroupContainer = styled.div`
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
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
const defaultCheckedList = ['전체 선택'];

const heightOptions = [
  '500m 미만',
  '500 ~ 1000m',
  '1000 ~ 1500m',
  '1500m 이상',
];

export default function ExplorePage() {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const onChange = (list: CheckboxValueType[], setCheckAllState: Function) => {
    setCheckedList(list);
    setCheckAllState(list.length === regionOptions.length);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? regionOptions : []);
    setCheckAll(e.target.checked);
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
            <FilterHeader>
              <FilterTitle>필터</FilterTitle>
              <FilterReset>
                <ResetImage />
                <ResetTitle>초기화</ResetTitle>
              </FilterReset>
            </FilterHeader>
            <FavoriateRegion>
              <FilterTitle>관심지역</FilterTitle>

              <CheckboxGroupContainer>
                <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                  전체 선택
                </Checkbox>

                <CheckboxGroup
                  options={regionOptions}
                  value={checkedList}
                  onChange={(list) => onChange(list, setCheckAll)}
                />
              </CheckboxGroupContainer>
            </FavoriateRegion>
            <div>
              <FilterTitle>높이</FilterTitle>
              <CheckboxGroupContainer>
                <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                  전체 선택
                </Checkbox>

                <CheckboxGroup options={heightOptions} value={checkedList} />
              </CheckboxGroupContainer>
            </div>
            <div>
              <SubTitle>가나다순 정렬</SubTitle>
              <FilterOption>
                <input type="checkbox" name="sort" id="sort" />
                <label htmlFor="sort0">가나다순 정렬</label>
              </FilterOption>
            </div>
            <div>
              <SubTitle>모임이 있는 산</SubTitle>
              <FilterOption>
                <input type="checkbox" name="hasTeam" id="sort" />
                <label htmlFor="hasTeam">모임이 있는 산</label>
              </FilterOption>
            </div>
          </FilterContainer>
          <MountainList>
            <MountainInfo />
            <MountainInfo />
            <MountainInfo />
            <MountainInfo />
            <MountainInfo />
            <MountainInfo />
          </MountainList>
        </SearchResultArea>

        <footer>푸터가 들어갈 자리입니다.</footer>
      </Container>
    </>
  );
}
