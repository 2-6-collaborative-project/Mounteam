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
  img: string | null;
  level: number;
  nickname: string;
  authorGender: string;
  authorAgeRange: string;
  areaInterest: string;
}
export default function UserProfile({
  img,
  level,
  nickname,
  authorGender,
  authorAgeRange,
  areaInterest,
}: UserProfileProps) {
  const handleGender = (gender: string) => {
    if (gender === 'male') {
      return '남성';
    } else return '여성';
  };

  const handleAuthorAge = (authorAgeRange: string) => {
    switch (authorAgeRange) {
      case 'teenager':
        return '10대';
      case 'twenties':
        return '20대';
      case 'thirties':
        return '30대';
      case 'fourties':
        return '40대';
      case 'fifties':
        return '50대';
      case 'sixties':
        return '60대 이상';
    }
  };

  return (
    <>
      <Container>
        {img !== null && img !== '' ? (
          <Avatar src={img} size={80} />
        ) : (
          <Avatar icon={<UserOutlined />} size={80} />
        )}
        <NamePreference>
          <Preferences>
            {authorGender && (
              <Preference>{handleGender(authorGender)}</Preference>
            )}
            {authorAgeRange && (
              <Preference>{handleAuthorAge(authorAgeRange)}</Preference>
            )}
            {areaInterest && <Preference>{areaInterest}</Preference>}
          </Preferences>
          <LevelNickname>
            <Level>{`Lv. ${level}`}</Level>
            <Nickname>{nickname}</Nickname>
          </LevelNickname>
        </NamePreference>
      </Container>
    </>
  );
}
