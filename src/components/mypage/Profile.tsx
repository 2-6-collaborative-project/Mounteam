import Image from 'next/image';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  width: 99.1rem;
  display: flex;
  gap: 5.7rem;
`;

const ProfileInformation = styled.div`
  width: 74.2rem;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ImageAndUsername = styled.div`
  display: flex;
  align-items: end;
  gap: 1.7rem;
`;

const ProfileImg = styled.div`
  width: 12.8rem;
  height: 12.8rem;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;

const TagAndUsername = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const LevelAndUsername = styled.div`
  display: flex;
`;

const UserLevel = styled.div`
  color: black;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.4rem;
`;

const Username = styled.div`
  color: black;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.4rem;
`;

const Tags = styled.div``;

const Description = styled.div`
  width: 40rem;
  height: auto;

  color: black;
  font-size: 2rem;
  font-family: Gapyeong Wave;
  font-weight: 400;
`;

const Batges = styled.div``;

const Records = styled.div``;

export default function Profile() {
  return (
    <>
      <ProfileContainer>
        <ProfileInformation>
          <ImageAndUsername>
            <ProfileImg>
              <Image
                src="/user.svg"
                alt="프로필이미지"
                layout="fill"
                loading="eager"
              />
            </ProfileImg>
            <TagAndUsername>
              <Tags>태그1</Tags>
              <LevelAndUsername>
                <UserLevel>{'Lv1.'}</UserLevel> <Username>{'닉네임'}</Username>
              </LevelAndUsername>
            </TagAndUsername>
          </ImageAndUsername>
          <Description>
            {
              '온갖 일들이 규칙적으로 묶여 있는 오늘날, 우리 생활 속에 남이 있는 비록 일시적이나마 완전한 자유로운 삶의 방식 하나가 등산이다.'
            }
          </Description>
        </ProfileInformation>
        <Image src="/user.svg" alt="수정" width={24} height={24} />
      </ProfileContainer>
      <Batges></Batges>
      <Records></Records>
    </>
  );
}
