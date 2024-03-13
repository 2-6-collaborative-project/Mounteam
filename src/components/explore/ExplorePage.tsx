'use client';

import styled from 'styled-components';
import GlobalStyle from '@/app/styles/globals';
import Tabs from '../shared/Tabs';

const Container = styled.div`
  width: 1200px;
`;

export default function ExplorePage() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <div>헤더가 들어갈 자리입니다.</div>
        <Tabs />

        <div className="searchMountainArea">
          <h2>대한민국 산 탐험하기</h2>
          <div className="searchInput">
            <img src="/search.svg"></img>
            <input type="text" placeholder="탐험하고 싶은 산을 찾아보세요." />
          </div>
          <div className="searchTags">
            <ul>
              <li>Tag1</li>
              <li>Tag2</li>
              <li>Tag3</li>
            </ul>
          </div>
          <div className="map">지도가 들어갈 자리입니다.</div>
        </div>

        <div className="searchResultArea">
          <div className="filterling">
            필터링 관련 부분이 들어갈 자리입니다.
          </div>
          <div className="mountainList">
            {/* map 반복문 통해 데이터 뿌려줄 예정 */}
            <div className="mountainInfo">
              <img src="#" alt="산 이미지" />
              <span>산 위치 정보</span>
              <div className="detail">
                <span>높이: 632m</span>
                <span>코스 개수: 15개</span>
              </div>
            </div>
          </div>
        </div>

        <footer>푸터가 들어갈 자리입니다.</footer>
      </Container>
    </>
  );
}
