import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { colors } from '@/app/styles/colors';

const Container = styled.div`
  display: flex;
  gap: 2rem;
`;

const NamePreference = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Preferences = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const Preference = styled.p`
  height: 2.6rem;
  padding: 0 0.7rem;
  color: ${colors.Primary[500]};
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.6rem;

  border-radius: 0.3rem;
  background: ${colors.Primary[50]};
`;

const LevelNickname = styled.div`
  display: flex;
  gap: 1rem;
`;
const Level = styled.p`
  color: ${colors.Grayscale[13]};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 3.2rem;
`;

const Nickname = styled.p`
  color: ${colors.Grayscale[13]};
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 3.2rem;
`;

interface UserProfileProps {
  img: string | null; //나중에 null 빼기
  preference1: string;
  preference2: string;
  level: string;
  nickname: string;
}
export default function UserProfile({
  img,
  preference1,
  preference2,
  level,
  nickname,
}: UserProfileProps) {
  return (
    <>
      <Container>
        <Avatar icon={img ? img : <UserOutlined />} size={80} />
        <NamePreference>
          <Preferences>
            <Preference>{preference1}</Preference>
            <Preference>{preference2}</Preference>
          </Preferences>
          <LevelNickname>
            <Level>{level ? 'Lv.' + level : ''}</Level>
            <Nickname>{nickname}</Nickname>
          </LevelNickname>
        </NamePreference>
      </Container>
    </>
  );
}
