import styled from 'styled-components';
import MyTeam from './MyTeam';
import { colors } from '@/app/styles/colors';

const MyteamContainer = styled.div`
  width: 100%;
  max-width: 99.6rem;
  display: flex;
  flex-direction: column;
  gap: 15rem;
`;

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Title = styled.p`
  color: ${colors.Grayscale[13]};
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.4rem;
`;

const Teams = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.8rem;
  @media (max-width: 1231px) {
    flex-wrap: '';
    flex-direction: column;
    align-items: center;
    gap: 7rem;
  }
  @media (max-width: 480px) {
    flex-wrap: '';
    flex-direction: column;
    align-items: center;
    gap: 5rem;
  }
`;

export default function MyTeamList() {
  return (
    <>
      <MyteamContainer>
        <TeamsContainer>
          <Title>내가 만든 모임</Title>
          <Teams>
            <MyTeam></MyTeam>
          </Teams>
        </TeamsContainer>
        <TeamsContainer>
          <Title>내가 참여한 모임</Title>
          <Teams>
            <MyTeam></MyTeam>
          </Teams>
        </TeamsContainer>
      </MyteamContainer>
    </>
  );
}
