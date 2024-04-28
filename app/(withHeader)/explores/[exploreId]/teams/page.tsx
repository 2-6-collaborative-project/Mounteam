'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import KakaoMap from '@/src/components/explores/KakaoMap';
import Tab from '@/src/components/shared/Tab';
import { colors } from '@/app/styles/colors';
import TeamThumbnail from '@/src/components/shared/TeamThumbnail';
import { authInstance, defaultInstance } from '@/src/lib/axiosInstance';

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

const TeamContainer = styled.div``;

const TeamListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
  row-gap: 3rem;
`;

const TeamItem = styled.div`
  cursor: pointer;
`;

const Container = styled.div`
  @media (max-width: 768px) {
    ${CreateTeam} {
      width: 65%;
    }
    ${TeamItem} {
      grid-template-columns: none;
    }
  }

  @media (max-width: 480px) {
    ${CreateTeam} {
      font-size: 1.8rem;
    }
  }
`;

export default function TeamList({
  params,
}: {
  params: { exploreId: number };
}) {
  const router = useRouter();
  const exploreId = params.exploreId;

  const { data: clickedMountainData } = useQuery({
    queryKey: ['clickedMountainList'],
    queryFn: () => defaultInstance.get(`/explores/${exploreId}`),
  });

  const { data: teamData } = useQuery({
    queryKey: ['teamList'],
    queryFn: () => authInstance.get('/teams'),
  });

  const clickedMountain = clickedMountainData?.data.data;
  const teamList = teamData?.data.data;

  const mountainTeams = teamList?.filter(
    (list: any) => list.mountain === clickedMountain?.mountain,
  );

  return (
    <Container>
      <Tab />

      <MainTitle>{clickedMountain?.mountain}</MainTitle>

      <MapContainer>
        <KakaoMap
          type="exploreSub"
          mountainList={clickedMountain}
          filteredItems={clickedMountain ? [clickedMountain] : []}
        />
      </MapContainer>

      <CreateTeamContainer>
        <SubTitle>원하는 모임이 없다면?</SubTitle>
        <CreateTeam onClick={() => router.push('/teams/create')}>
          내가 직접 모임 만들기
        </CreateTeam>
      </CreateTeamContainer>

      <TeamContainer>
        <TeamTotalCount>
          {clickedMountain?.mountain} 등산모임 : {mountainTeams?.length}개
        </TeamTotalCount>

        <TeamListContainer>
          {mountainTeams?.map((team: any) => (
            <TeamItem
              key={team.teamId}
              onClick={() => router.push(`/teams/${team.teamId}`)}
            >
              <TeamThumbnail team={team} />
            </TeamItem>
          ))}
        </TeamListContainer>
      </TeamContainer>
    </Container>
  );
}
