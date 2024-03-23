'use client';

import styled from 'styled-components';
import KakaoMap from '@/src/components/explore/KakaoMap';

const Container = styled.div`
  margin: 3.2rem 10.4rem;
`;

const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  line-height: 4.2rem;
`;

const TeamTotalCount = styled.p`
  margin-top: 5.5rem;
  margin-bottom: 2.8rem;
  color: var(--xn-hu-5-b-2-ji-36-aba-com-ship-gray, #3f3f46);
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.5rem;
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, 26.25rem));
  column-gap: 2rem;
  row-gap: 3rem;
`;
const TeamItem = styled.div`
  width: 26.25rem;
  height: 33.58333rem;
  background-color: #d9d9d9;
`;

export default function TeamList() {
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
        </div>
        <KakaoMap />

        <div className="mountainTeamList">
          <TeamTotalCount>관악산 등산모임: 4개</TeamTotalCount>
          <TeamContainer>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
          </TeamContainer>
        </div>
      </Container>
    </>
  );
}
