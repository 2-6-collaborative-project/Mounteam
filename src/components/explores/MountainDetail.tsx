'use client';

import styled from 'styled-components';
import KakaoMap from './ExplorePage/KakaoMap';
import mountainDataProps from '@/src/types/mountainDataProps';

const Container = styled.div`
  margin: 3.2rem 10.4rem;
`;

const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  line-height: 4.2rem;
`;

const ActivityTabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
`;
const ActivityTab = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

const CourseInfoArea = styled.div`
  margin-top: 2rem;
`;
const CourseTotalCount = styled(MainTitle)`
  margin-bottom: 1.6rem;
  color: var(--xn-hu-5-b-2-ji-36-aba-com-ship-gray, #3f3f46);
  font-size: 2rem;
  line-height: 2.5rem;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, 26.25rem));
  column-gap: 2rem;
  row-gap: 2rem;
`;

const CourseInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  flex-direction: column;
  background: #cafb3b;
`;

const CourseTitle = styled.span`
  color: var(--xn-hu-5-b-2-ji-36-aba-com-ship-gray, #3f3f46);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2.5rem;
`;

const CourseContent = styled(CourseTitle)`
  font-size: 1.3rem;
  font-weight: 600;
`;

interface MountainDetailProps {
  exploreId: number;
  list: mountainDataProps[];
}
export default function MountainDetail({
  exploreId,
  list,
}: MountainDetailProps) {
  const clickedMountain = list.find((mountain) => mountain.X좌표 === exploreId); // 예시로 X좌표로 비교

  return (
    <>
      <Container>
        <div
          style={{
            height: '4.6rem',
            backgroundColor: '#ddd',
          }}
        >
          탭이 들어갈 자리입니다.
        </div>

        <div>
          <div
            style={{
              height: '5.7rem',
              backgroundColor: '#ddd',
              marginTop: '0.4rem',
            }}
          >
            브레드 크럼블이 들어갈 자리입니다.
          </div>
          <MainTitle>{clickedMountain?.명산_이름}</MainTitle>
          {/* <KakaoMap /> */}
        </div>
        <ActivityTabs>
          <ActivityTab>등산 모임 n개</ActivityTab>
          <ActivityTab>등반 후기 n개</ActivityTab>
        </ActivityTabs>
        <CourseInfoArea>
          <CourseGrid>
            <CourseInfo>
              <CourseContent>{clickedMountain?.명산_소재지}</CourseContent>
              <CourseContent>{clickedMountain?.명산_높이}</CourseContent>
              <CourseContent>난이도</CourseContent>
            </CourseInfo>
          </CourseGrid>
        </CourseInfoArea>
      </Container>
    </>
  );
}
