'use client';

import styled from 'styled-components';
import GlobalStyle from '@/app/styles/globals';

const Container = styled.div`
  margin: 3.2rem 10.4rem;
`;

const SearchMountainArea = styled.div``;
const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  line-height: 4.2rem;
`;

const SearchTagContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin: 2.5rem 0 4.2rem 0;
`;

const SearchTag = styled.span`
  padding: 0.1rem 0.8rem;
  border-radius: 0.2rem;
  border: 1px solid var(--Neutral-5, #d9d9d9);
  background: var(--Neutral-2, #fafafa);
`;

const MountainMap = styled.div`
  height: 40rem;
  background: #d9d9d9;
`;

const SearchResultArea = styled.div`
  display: flex;
  margin-top: 6rem;
`;

const Filterling = styled.div`
  margin-right: 10rem;
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, 30rem));
  column-gap: 2rem;
  row-gap: 4rem;
`;

const MountainItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MountainName = styled.p`
  color: var(--MDS-Grayscale-13, #000);
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 3.2rem;
`;

const MountainDetail = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const MountainLocation = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const MountainStatus = styled.p`
  position: relative;
  color: var(--MDS-Grayscale-7, #8c8c8c);
  font-size: 1.4rem;
  line-height: 2rem;
`;

const MountainHeight = styled(MountainStatus)`
  &:before {
    content: '';
    width: 0.1rem;
    height: 1.5rem;
    background-color: var(--MDS-Grayscale-7, #8c8c8c);
    position: absolute;
    top: 0.4rem;
    right: -1.3rem;
  }
`;
export default function ExplorePage() {
  return (
    <>
      <GlobalStyle />
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
            인풋이 들어갈 자리입니다.
          </div>
          <SearchTagContainer>
            <SearchTag>Tag1</SearchTag>
            <SearchTag>Tag2</SearchTag>
            <SearchTag>Tag3</SearchTag>
          </SearchTagContainer>
          <MountainMap>지도가 들어갈 자리입니다.</MountainMap>
        </SearchMountainArea>

        <SearchResultArea>
          <Filterling>
            <FavoriateRegion>
              <SubTitle>관심지역</SubTitle>

              <FilterOption>
                <input type="radio" name="region" id="서울" value="서울" />
                <label htmlFor="서울">서울</label>
              </FilterOption>
              <FilterOption>
                <input type="radio" name="region" id="경기도" value="경기도" />
                <label htmlFor="경기도">경기도</label>
              </FilterOption>
              <FilterOption>
                <input type="radio" name="region" id="강원도" value="강원도" />
                <label htmlFor="강원도">강원도</label>
              </FilterOption>
              <FilterOption>
                <input
                  type="radio"
                  name="region"
                  id="충청북도"
                  value="충청북도"
                />
                <label htmlFor="충청북도">충청북도</label>
              </FilterOption>
              <FilterOption>
                <input
                  type="radio"
                  name="region"
                  id="충청남도"
                  value="충청남도"
                />
                <label htmlFor="충청남도">충청남도</label>
              </FilterOption>
              <FilterOption>
                <input
                  type="radio"
                  name="region"
                  id="전라북도"
                  value="전라북도"
                />
                <label htmlFor="전라북도">전라북도</label>
              </FilterOption>
              <FilterOption>
                <input
                  type="radio"
                  name="region"
                  id="전라남도"
                  value="전라남도"
                />
                <label htmlFor="전라남도">전라남도</label>
              </FilterOption>
              <FilterOption>
                <input
                  type="radio"
                  name="region"
                  id="경상북도"
                  value="경상북도"
                />
                <label htmlFor="경상북도">경상북도</label>
              </FilterOption>
              <FilterOption>
                <input
                  type="radio"
                  name="region"
                  id="경상남도"
                  value="경상남도"
                />
                <label htmlFor="경상남도">경상남도</label>
              </FilterOption>
              <FilterOption>
                <input type="radio" name="region" id="제주도" value="제주도" />
                <label htmlFor="제주도">제주도</label>
              </FilterOption>
            </FavoriateRegion>
            <div>
              <SubTitle>높이</SubTitle>

              <FilterOption>
                <input
                  type="radio"
                  name="mountainHeight"
                  id="height_under_500"
                  value="height_under_500"
                />
                <label htmlFor="height_under_500">500m 미만</label>
              </FilterOption>
              <FilterOption>
                <input
                  type="radio"
                  name="mountainHeight"
                  id="height_500_to_1000"
                  value="height_500_to_1000"
                />
                <label htmlFor="height_500_to_1000">500m ~ 1000m</label>
              </FilterOption>
              <FilterOption>
                <input
                  type="radio"
                  name="mountainHeight"
                  id="height_1000_to_1500"
                  value="height_1000_to_1500"
                />
                <label htmlFor="height_1000_to_1500">1000 ~ 1500m</label>
              </FilterOption>
              <FilterOption>
                <input
                  type="radio"
                  name="mountainHeight"
                  id="height_over_1500"
                  value="height_over_1500"
                />
                <label htmlFor="height_over_1500">1500m 이상</label>
              </FilterOption>
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
          </Filterling>
          <MountainList>
            <MountainItem>
              <div
                style={{
                  width: '30rem',
                  height: '30rem',
                  backgroundColor: '#d9d9d9',
                }}
              >
                산 이미지
              </div>
              <div>
                <MountainName>관악산</MountainName>
                <MountainLocation>산 위치 정보</MountainLocation>
                <MountainDetail>
                  <MountainHeight>높이: 632m</MountainHeight>
                  <MountainStatus>코스 개수: 15개</MountainStatus>
                </MountainDetail>
              </div>
            </MountainItem>
            <MountainItem>
              <div
                style={{
                  width: '30rem',
                  height: '30rem',
                  backgroundColor: '#d9d9d9',
                }}
              >
                산 이미지
              </div>
              <div>
                <MountainName>관악산</MountainName>
                <MountainLocation>산 위치 정보</MountainLocation>
                <MountainDetail>
                  <MountainHeight>높이: 632m</MountainHeight>
                  <MountainStatus>코스 개수: 15개</MountainStatus>
                </MountainDetail>
              </div>
            </MountainItem>
            <MountainItem>
              <div
                style={{
                  width: '30rem',
                  height: '30rem',
                  backgroundColor: '#d9d9d9',
                }}
              >
                산 이미지
              </div>
              <div>
                <MountainName>관악산</MountainName>
                <MountainLocation>산 위치 정보</MountainLocation>
                <MountainDetail>
                  <MountainHeight>높이: 632m</MountainHeight>
                  <MountainStatus>코스 개수: 15개</MountainStatus>
                </MountainDetail>
              </div>
            </MountainItem>
            <MountainItem>
              <div
                style={{
                  width: '30rem',
                  height: '30rem',
                  backgroundColor: '#d9d9d9',
                }}
              >
                산 이미지
              </div>
              <div>
                <MountainName>관악산</MountainName>
                <MountainLocation>산 위치 정보</MountainLocation>
                <MountainDetail>
                  <MountainHeight>높이: 632m</MountainHeight>
                  <MountainStatus>코스 개수: 15개</MountainStatus>
                </MountainDetail>
              </div>
            </MountainItem>
            <MountainItem>
              <div
                style={{
                  width: '30rem',
                  height: '30rem',
                  backgroundColor: '#d9d9d9',
                }}
              >
                산 이미지
              </div>
              <div>
                <MountainName>관악산</MountainName>
                <MountainLocation>산 위치 정보</MountainLocation>
                <MountainDetail>
                  <MountainHeight>높이: 632m</MountainHeight>
                  <MountainStatus>코스 개수: 15개</MountainStatus>
                </MountainDetail>
              </div>
            </MountainItem>
            <MountainItem>
              <div
                style={{
                  width: '30rem',
                  height: '30rem',
                  backgroundColor: '#d9d9d9',
                }}
              >
                산 이미지
              </div>
              <div>
                <MountainName>관악산</MountainName>
                <MountainLocation>산 위치 정보</MountainLocation>
                <MountainDetail>
                  <MountainHeight>높이: 632m</MountainHeight>
                  <MountainStatus>코스 개수: 15개</MountainStatus>
                </MountainDetail>
              </div>
            </MountainItem>
          </MountainList>
        </SearchResultArea>

        <footer>푸터가 들어갈 자리입니다.</footer>
      </Container>
    </>
  );
}
