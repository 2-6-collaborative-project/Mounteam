'use client';
import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import MountainInfo from '../shared/MountainInfo';
import ExploreCheckbox from './ExploreCheckbox';

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
  .ant-collapse-header {
    padding: 0 !important;
  }

  .ant-collapse-content-box {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 0 0 0 !important;
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
      display: block;
      margin-top: 0;
    }
  }

  @media (max-width: 480px) {
    max-width: 40rem;

    ${MountainList} {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 40rem));
   }
`;

export default function ExplorePage() {
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
  // const handleRegionChange = (checkedValues) => {
  //   console.log('선택된 지역:');
  //   checkedValues.forEach((value) => {
  //     console.log(value);
  //   });
  // };

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
              <CheckboxGroupContainer>
                <ExploreCheckbox label={'관심지역'} options={regionOptions} />
              </CheckboxGroupContainer>
            </FilterContents>
            <FilterContents>
              <CheckboxGroupContainer>
                <ExploreCheckbox label={'높이'} options={heightOptions} />
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
