'use client';

import styled from 'styled-components';
import KakaoMap from '@/src/components/explores/ExplorePage/KakaoMap';
import Tab from '@/src/components/shared/Tab';
import mountainDataProps from '@/src/types/mountainDataProps';
import { colors } from '@/app/styles/colors';
import { useRouter } from 'next/navigation';

const MainTitle = styled.h2`
  margin-top: 4.8rem;
  font-size: 3rem;
  font-weight: 600;
`;

const MapContainer = styled.div`
  margin-top: 6.67rem;
  margin-bottom: 2.92rem;
`;

const CreateTeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1.67rem 0;
  background-color: #f2f0f0;
`;

const SubTitle = styled.p`
  color: ${colors.Grayscale[13]};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.3rem;
`;

const CreateTeam = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40rem;
  height: 5.5rem;
  padding: 0.8rem;

  border-radius: 0.25rem;
  background-color: ${colors.Primary[500]};

  font-size: 2rem;
  color: ${colors.Grayscale[1]};
`;

const TeamTotalCount = styled.p`
  margin-top: 5.5rem;
  margin-bottom: 2.8rem;
  color: #3f3f46;
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
  height: 33.5rem;
  background-color: ${colors.Grayscale[5]};
`;

interface MountainDetailProps {
  exploreId: number;
  list: mountainDataProps[];
}

const Container = styled.div``;
export default function TeamList({ exploreId, list }: MountainDetailProps) {
  const router = useRouter();
  const clickedMountain = list?.find(
    (mountain) => mountain.X좌표 === exploreId,
  );
  return (
    <>
      <Container>
        <Tab variant="explores" />

        <MainTitle>{clickedMountain?.명산_이름}</MainTitle>

        <MapContainer>
          <KakaoMap
            type="exploreSub"
            mountainList={list}
            filteredItems={clickedMountain ? [clickedMountain] : []}
          />
        </MapContainer>

        <CreateTeamContainer>
          <SubTitle>원하는 모임이 없다면?</SubTitle>
          <CreateTeam onClick={() => router.push('/teams/create')}>
            내가 직접 모임 만들기
          </CreateTeam>
        </CreateTeamContainer>

        <div className="mountainTeamList">
          <TeamTotalCount>
            {clickedMountain?.명산_이름} 등산모임 : 4개
          </TeamTotalCount>
          <TeamContainer>
            <TeamItem>모임 관련 정보가 들어갈 자리입니다.</TeamItem>
          </TeamContainer>
        </div>
      </Container>
    </>
  );
}
