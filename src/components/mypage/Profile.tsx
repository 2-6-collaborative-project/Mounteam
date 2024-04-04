'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Avatars from '@/src/components/shared/Avatar';
import EditProfile from './EditProfile';
import Link from 'next/link';
import { colors } from '@/app/styles/colors';

const FlexContainer = styled.div`
  width: 100%;
  max-width: 99rem;
  min-width: 63.9rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;

  @media (max-width: 480px) {
    max-width: none;
    min-width: 0;
  }
`;
const ProfileContainer = styled.div`
  height: 12.8rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 3rem;

  @media (max-width: 480px) {
    max-width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
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
  min-width: 26rem;
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
  width: 100%;
  max-width: 65.3rem;

  color: var(--black-000000);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 3.2rem;
  word-wrap: break-word;
  text-align: right;

  @media (max-width: 480px) {
    max-width: none;
    min-width: 0;
    text-align: left;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const BadgeTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    max-width: 100%;
  }
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

const NobadgeText = styled.p`
  color: ${colors.Grayscale[13]};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 3rem;
`;

interface ProfileProps {
  level?: number;
  name?: string;
  img?: string;
  preference?: string[] | undefined;
  description?: string;
  age?: string;
  region?: string;
  clickShowAll?: () => void;
  refetch: () => void;
}

interface AgeMap {
  [key: string]: number;
}
export default function Profile({
  level,
  name,
  img,
  description,
  age,
  region,
  clickShowAll,
  refetch,
}: ProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ages, setAges] = useState('');

  const handleEditProfile = () => {
    setIsModalOpen(!isModalOpen);
  };

  const ageMap: AgeMap = {
    teenager: 10,
    twenties: 20,
    thirties: 30,
    fourties: 40,
    fifties: 50,
    sixties: 60,
  };

  useEffect(() => {
    if (age) {
      const mapAge = ageMap[age];
      if (mapAge === 60) {
        setAges(mapAge + '대 이상');
      } else {
        setAges(mapAge + '대');
      }
    }
  }, [age]);

  return (
    <>
      <FlexContainer>
        <ProfileContainer>
          <AvatarContainer>
            <Avatars type="profile" img={img} />
            <TagsAndName>
              <Preferences>
                <Preference>{ages}</Preference>
                <Preference>{region}</Preference>
              </Preferences>
              <LevelAndNickname>
                <Level>{level !== undefined ? 'Lv.' + level : ''}</Level>
                <NicknameContainer>
                  <Nickname>{name}</Nickname>
                  <Image
                    alt="프로필수정"
                    src="/edit.svg"
                    width={16}
                    height={16}
                    onClick={handleEditProfile}
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
              <Link href={'/certification'}>
                <Option>인증하기</Option>
              </Link>
            </OptionContainer>
          </BadgeTitleContainer>
          {/* <Badges>
            <Badge></Badge>
          </Badges> */}
          <div>
            <NobadgeText>아직 얻은 배지가 없습니다. </NobadgeText>
            <NobadgeText>
              인증하기를 통해 다녀온 산을 인증하고 배지를 추가해보세요!
            </NobadgeText>
          </div>
        </BadgeContainer>
      </FlexContainer>
      <EditProfile
        modalOpenState={isModalOpen}
        setter={setIsModalOpen}
        refetch={refetch}
        defaultProfileImg={img}
        defaultNickname={name}
        defaultDescription={description}
        defaultAge={age}
        defaultRegion={region}
      />
    </>
  );
}
