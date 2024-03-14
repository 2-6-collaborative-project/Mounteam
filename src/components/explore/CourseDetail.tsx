'use client';

import styled from 'styled-components';
import GlobalStyle from '@/app/styles/globals';

const Container = styled.div`
  width: 1200px;
`;

export default function CourseDetail() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <div>헤더가 들어갈 자리입니다.</div>
        <div>탭이 들어갈 자리입니다.</div>

        <div className="mountainDetail">
          <nav className="breadCrumb">
            <ul>
              <li>
                <a href="#">추천</a>
              </li>
              <li>
                <a href="#">관악산</a>
              </li>
              <li>
                <a href="#">관악산 상세</a>
              </li>
            </ul>
          </nav>
          <h2>산 이름</h2>
          <div className="map">지도가 들어갈 자리입니다.</div>
        </div>
        <div className="activitiesButtons">
          <button>등산 모임 n개</button>
          <button>등반 후기 n개</button>
        </div>
        <div className="courseDetail">
          <h3>코스 1</h3>
          <p>코스 경로</p>
          <p>난이도: 하</p>
          <p>소요시간:</p>
        </div>
        <footer>푸터가 들어갈 자리입니다.</footer>
      </Container>
    </>
  );
}
