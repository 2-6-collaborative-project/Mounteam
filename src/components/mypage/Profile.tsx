import Image from 'next/image';
import styled from 'styled-components';
import Avatars from '../shared/Avatar';

const ProfileContainer = styled.div`
  max-width: 98.8rem;
  height: 12.8rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const AvatarContainer = styled.div`
  height: 12.8rem;
  display: flex;
  gap: 2rem;
`;

const TagsAndName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Preferences = styled.div`
  height: 2.6rem;
  display: flex;
  gap: 0.7rem;
`;

const Preference = styled.div`
  height: 2.6rem;
  padding: 0 0.7rem 0 0.7rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  border-radius: 3px;
  background-color: #d3dcfd;
  text-align: center;
  color: #0331d1;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
`;

const LevelAndNickname = styled.div`
  display: flex;
  flex-direction: column;
`;

const Level = styled.p`
  color: var(--black-000000);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 3.2rem;
`;

const NicknameContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
`;

const Nickname = styled.p`
  color: var(--black-000000);
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 3.2rem;
`;

const Description = styled.p`
  color: var(--black-000000);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 3.2rem;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const BadgeTitleContainer = styled.div`
  max-width: 99rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BadgeTitle = styled.div`
  color: var(--black-000000);
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 2.4rem;
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 1.8rem;
`;

const Option = styled.p`
  color: var(--black-000000);
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
`;
const Badges = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const Badge = styled.div``;

interface ProfileProps {
  level: number;
  name: string;
  img: string;
  preference: string[] | undefined;
  description: string;
  clickShowAll: () => void;
  clickVerify: () => void;
}

export default function Profile({
  level,
  name,
  img,
  preference,
  description,
  clickShowAll,
  clickVerify,
}: ProfileProps) {
  return (
    <>
      <ProfileContainer>
        <AvatarContainer>
          <Avatars type="profile" img={img} />
          <TagsAndName>
            <Preferences>
              {preference?.map((item: string, index: number) => (
                <Preference key={'preference' + index}>{item}</Preference>
              ))}
            </Preferences>
            <LevelAndNickname>
              <Level>{'Lv.' + level}</Level>
              <NicknameContainer>
                <Nickname>{name + 'd'}</Nickname>
                <Image
                  alt="프로필수정"
                  src="/edit.svg"
                  width={16}
                  height={16}
                />
              </NicknameContainer>
            </LevelAndNickname>
          </TagsAndName>
        </AvatarContainer>
        <Description>{description}</Description>
      </ProfileContainer>
      <BadgeContainer>
        <BadgeTitleContainer>
          <BadgeTitle>내 뱃지</BadgeTitle>
          <OptionContainer>
            <Option onClick={clickShowAll}>전체보기</Option>
            <Option onClick={clickVerify}>인증하기</Option>
          </OptionContainer>
        </BadgeTitleContainer>
        <Badges>
          <Badge></Badge>
        </Badges>
      </BadgeContainer>
    </>
  );
}
