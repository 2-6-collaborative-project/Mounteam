'use client';

import styled from 'styled-components';
import GlobalStyle from '@/app/styles/globals';

const Container = styled.div`
  width: 1200px;
`;

export default function TeamList() {
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

        <div className="mountainTeamList">
          <p className="totalCount">관악산 등산모임: 4개</p>
          <div className="teamList">
            <ul>
              <li>
                <a href="#">
                  <img src="" alt="모임 대표 이미지" />
                  <h3 className="title">모임 제목</h3>
                  <div className="meetingInfo">
                    <span>관악산 입구</span>
                    <span>3.27(수)</span>
                    <span>오후 2시</span>
                  </div>
                  <div className="totalMember">
                    <img src="/members" alt="멤버" />
                    <span>3/10</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}
