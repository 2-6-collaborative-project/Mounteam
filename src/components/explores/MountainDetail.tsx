'use client';

import styled from 'styled-components';
import KakaoMap from './ExplorePage/KakaoMap';

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
export default function MountainDetail() {
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
          <MainTitle>산 이름</MainTitle>
          {/* <KakaoMap /> */}
        </div>
        <ActivityTabs>
          <ActivityTab>등산 모임 n개</ActivityTab>
          <ActivityTab>등반 후기 n개</ActivityTab>
        </ActivityTabs>
        <CourseInfoArea>
          <CourseTotalCount>관악산 코스: 4개</CourseTotalCount>
          <CourseGrid>
            <CourseInfo>
              <CourseTitle>코스 1</CourseTitle>
              <CourseContent>
                수순은 있기 환기통에서 때와 글과, 때의 그래 지난다. 나에 업무로
                마침내 뻗는데 밀집되어서 가깝는 가치를, 위기와 지나고 있습니다.
              </CourseContent>
              <CourseContent>난이도: 하</CourseContent>
              <CourseContent>
                소요시간: 정상까지 편도 1시간~1시간30분
              </CourseContent>
            </CourseInfo>
            <CourseInfo>
              <CourseTitle>코스 1</CourseTitle>
              <CourseContent>
                수순은 있기 환기통에서 때와 글과, 때의 그래 지난다. 나에 업무로
                마침내 뻗는데 밀집되어서 가깝는 가치를, 위기와 지나고 있습니다.
              </CourseContent>
              <CourseContent>난이도: 하</CourseContent>
              <CourseContent>
                소요시간: 정상까지 편도 1시간~1시간30분
              </CourseContent>
            </CourseInfo>
            <CourseInfo>
              <CourseTitle>코스 1</CourseTitle>
              <CourseContent>
                수순은 있기 환기통에서 때와 글과, 때의 그래 지난다. 나에 업무로
                마침내 뻗는데 밀집되어서 가깝는 가치를, 위기와 지나고 있습니다.
              </CourseContent>
              <CourseContent>난이도: 하</CourseContent>
              <CourseContent>
                소요시간: 정상까지 편도 1시간~1시간30분
              </CourseContent>
            </CourseInfo>
            <CourseInfo>
              <CourseTitle>코스 1</CourseTitle>
              <CourseContent>
                수순은 있기 환기통에서 때와 글과, 때의 그래 지난다. 나에 업무로
                마침내 뻗는데 밀집되어서 가깝는 가치를, 위기와 지나고 있습니다.
              </CourseContent>
              <CourseContent>난이도: 하</CourseContent>
              <CourseContent>
                소요시간: 정상까지 편도 1시간~1시간30분
              </CourseContent>
            </CourseInfo>
            <CourseInfo>
              <CourseTitle>코스 1</CourseTitle>
              <CourseContent>
                수순은 있기 환기통에서 때와 글과, 때의 그래 지난다. 나에 업무로
                마침내 뻗는데 밀집되어서 가깝는 가치를, 위기와 지나고 있습니다.
              </CourseContent>
              <CourseContent>난이도: 하</CourseContent>
              <CourseContent>
                소요시간: 정상까지 편도 1시간~1시간30분
              </CourseContent>
            </CourseInfo>
            <CourseInfo>
              <CourseTitle>코스 1</CourseTitle>
              <CourseContent>
                수순은 있기 환기통에서 때와 글과, 때의 그래 지난다. 나에 업무로
                마침내 뻗는데 밀집되어서 가깝는 가치를, 위기와 지나고 있습니다.
              </CourseContent>
              <CourseContent>난이도: 하</CourseContent>
              <CourseContent>
                소요시간: 정상까지 편도 1시간~1시간30분
              </CourseContent>
            </CourseInfo>
            <CourseInfo>
              <CourseTitle>코스 1</CourseTitle>
              <CourseContent>
                수순은 있기 환기통에서 때와 글과, 때의 그래 지난다. 나에 업무로
                마침내 뻗는데 밀집되어서 가깝는 가치를, 위기와 지나고 있습니다.
              </CourseContent>
              <CourseContent>난이도: 하</CourseContent>
              <CourseContent>
                소요시간: 정상까지 편도 1시간~1시간30분
              </CourseContent>
            </CourseInfo>
            <CourseInfo>
              <CourseTitle>코스 1</CourseTitle>
              <CourseContent>
                수순은 있기 환기통에서 때와 글과, 때의 그래 지난다. 나에 업무로
                마침내 뻗는데 밀집되어서 가깝는 가치를, 위기와 지나고 있습니다.
              </CourseContent>
              <CourseContent>난이도: 하</CourseContent>
              <CourseContent>
                소요시간: 정상까지 편도 1시간~1시간30분
              </CourseContent>
            </CourseInfo>
            <CourseInfo>
              <CourseTitle>코스 1</CourseTitle>
              <CourseContent>
                수순은 있기 환기통에서 때와 글과, 때의 그래 지난다. 나에 업무로
                마침내 뻗는데 밀집되어서 가깝는 가치를, 위기와 지나고 있습니다.
              </CourseContent>
              <CourseContent>난이도: 하</CourseContent>
              <CourseContent>
                소요시간: 정상까지 편도 1시간~1시간30분
              </CourseContent>
            </CourseInfo>
          </CourseGrid>
        </CourseInfoArea>
        <footer>푸터가 들어갈 자리입니다.</footer>
      </Container>
    </>
  );
}
