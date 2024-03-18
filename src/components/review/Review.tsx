import Image from 'next/image';
import styled from 'styled-components';

const ReviewContainer = styled.div`
  width: 31.5rem;
  height: 51.2rem;

  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

const ProfileImg = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  position: relative;
  background-color: #bbbbbb;
  border-radius: 50%;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Level = styled.div`
  text-align: center;
  color: var(--black-000000);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.2rem;
`;

const Name = styled.div`
  text-align: center;
  color: var(--black-000000);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
`;

const MeatBall = styled.div`
  width: 2.1rem;
  height: 2.1rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.8rem;
`;
const Tag = styled.div`
  height: 2.2rem;
  padding: 0 0.8rem 0 0.8rem;

  background: var(--gray-FAFAFA);
  border-radius: 2px;
  border: 1px var(--gray-D9D9D9) solid;

  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3px;
`;

const Description = styled.p`
  color: var(--black-000000);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.1rem;
`;
const Reactions = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const Imgs = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
`;

const Counts = styled.p`
  color: var(--black-000000);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.2rem;
`;

export default function Review() {
  return (
    <>
      <ReviewContainer>
        <Header>
          <User>
            <ProfileImg>
              {/* 나중에수정 */}
              <Image src="/user.svg" alt="프로필이미지" layout="fill" />
            </ProfileImg>
            <NameContainer>
              <Level>Lv.{}</Level>
              <Name>{}</Name>
            </NameContainer>
          </User>
          <MeatBall>
            <Image
              src="/meatballs.svg"
              alt="미트볼버튼"
              width={21}
              height={4}
            />
          </MeatBall>
        </Header>
        <Tags>
          <Tag>태그그그</Tag>
        </Tags>
        <Description>
          {
            '약품에서 곳이 일으킨 모든 온다 사회도 앉지. 수 이 그 사정이 따릅니다. 놓지만 되살린, 버는데 세상이다 반공보다 21일, 주어 가질까 황당합니다. 있는 원래가 그, 맛있지만, '
          }
        </Description>
        <Reactions>
          <Container>
            <Imgs>
              <Image src="/emptyHeart.svg" alt="좋아요" layout="fill" />
            </Imgs>
            <Counts>1</Counts>
          </Container>
          <Container>
            <Imgs>
              <Image src="/message.svg" alt="댓글" layout="fill" />
            </Imgs>
            <Counts>2</Counts>
          </Container>
          <Container>
            <Imgs>
              <Image src="/emptyBookmark.svg" alt="북마크" layout="fill" />
            </Imgs>
            <Counts>3</Counts>
          </Container>
        </Reactions>
      </ReviewContainer>
    </>
  );
}
