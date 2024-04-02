'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import KakaoMap from '@/src/components/explores/KakaoMap';
import Tab from '@/src/components/shared/Tab';
import mountainDataProps from '@/src/types/mountainDataProps';
import getMountainData from '@/src/components/explores/api/getMountainData';

const MainTitle = styled.h2`
  margin-top: 4.8rem;
  font-size: 2.5rem;
  font-weight: 600;
`;

const MapContainer = styled.div`
  margin-top: 6.67rem;
`;

const ActivityTabs = styled.div`
  display: flex;
  padding: 2.5rem 0rem;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
`;

const StyledLink = styled(Link)`
  width: 100%;
`;

const ActivityTab = styled.div<{ $team?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 14rem;

  color: #000;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.66667rem;
  text-align: center;
  transition: background-color 0.3s ease;
  border-radius: 30px;
  &:hover {
    background-color: ${({ $team }) => ($team ? '#D9D9D9;' : '#EED7D7;')};
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  padding-top: 8rem;
  padding-bottom: 17.25rem;
  justify-content: space-between;
  gap: 8.5rem;
`;
const MountaineImage = styled.div``;

const StyledImage = styled(Image)`
  width: 26rem;
  hwight: 26rem;
`;

const MountainContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const MountainContent = styled.div<{ $outline?: boolean }>`
  display: flex;
  flex-direction: ${({ $outline }) => ($outline ? 'column;' : 'row;')};
  align-items: ${({ $outline }) => ($outline ? 'flex-start;' : 'center;')};
  gap: ${({ $outline }) => ($outline ? '1.25rem;' : '9rem;')};
`;

const Title = styled.p`
  flex: 1;
  text-wrap: nowrap;
  color: #000;
  font-size: 1.6rem;
  font-weight: 600;
`;

const Content = styled.span`
  color: #000;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.8;
`;

const Container = styled.div`
  @media (max-width: 768px) {
    ${StyledImage} {
      width: 20rem;
      height: 20rem;
    }

    ${DetailsContainer} {
      gap: 3.4rem;
    }
  }

  @media (max-width: 480px) {
    ${DetailsContainer} {
      display: block;
    }

    ${StyledImage} {
      width: 100%;
      height: auto;
      margin-bottom: 3.33rem;
    }

    ${Title} {
      width: 4.75rem;
    }
  }
`;

export default function MountainDetail({
  params,
}: {
  params: { exploreId: number };
}) {
  const exploreId = params.exploreId;
  const { data: mountainList } = useQuery({
    queryKey: ['mountainList1'],
    queryFn: () => getMountainData(),
  });

  const clickedMountain = mountainList?.find(
    (list: mountainDataProps) => list.X좌표 === exploreId,
  ); // 예시로 X좌표로 비교

  return (
    <>
      <Container>
        <Tab variant="explores" />
        <MainTitle>{clickedMountain?.명산_이름}</MainTitle>
        <MapContainer>
          <KakaoMap
            type="exploreSub"
            mountainList={mountainList}
            filteredItems={clickedMountain ? [clickedMountain] : []}
          />
        </MapContainer>
        <ActivityTabs>
          <StyledLink href={`/explores/${exploreId}/teams`}>
            <ActivityTab $team>
              등산 모임
              <br />
              n개
            </ActivityTab>
          </StyledLink>
          <StyledLink href={`/explores/${exploreId}/reviews`}>
            <ActivityTab>
              등반 후기
              <br />
              n개
            </ActivityTab>
          </StyledLink>
        </ActivityTabs>
        <DetailsContainer>
          <MountaineImage>
            <StyledImage
              width={260}
              height={260}
              objectFit="cover"
              src="/sample.jpg"
              alt="산 이미지"
            />
          </MountaineImage>
          <MountainContents>
            <MountainContent $outline>
              <Title>개요</Title>
              <Content>
                지니고 자신에 셈 또 누리다. 엄중의 출발하라고 신은 기업을 괴력에
                파악하다. 서로 사람의 이러하여 싫은 중간을 것 듯이 보아요.
                콘크리트가 손도 논의가 면봉을 수 커집니다, 주문하게 없는 경우를
                않다. 확대되다 지식에 당연히 이어받지요 때문 끊으네. 지 지니고
                자신에 셈 또 누리다. 엄중의 출발하라고 신은 기업을 괴력에
                파악하다. 서로 사람의 이러하여 싫은 중간을 것 듯이 보아요.
                콘크리트가 손도 논의가 면봉을 수 커집니다, 주문하게 없는 경우를
                않다. 확대되다 지식에 당연히 이어받지요 때문 끊으
              </Content>
            </MountainContent>
            <MountainContent>
              <Title>산 높이</Title>
              <Content>{clickedMountain?.명산_높이}m</Content>
            </MountainContent>
            <MountainContent>
              <Title>위치</Title>
              <Content>{clickedMountain?.명산_소재지}</Content>
            </MountainContent>
            <MountainContent>
              <Title>산 난이도</Title>
              <Content>중</Content>
            </MountainContent>
          </MountainContents>
        </DetailsContainer>
      </Container>
    </>
  );
}
