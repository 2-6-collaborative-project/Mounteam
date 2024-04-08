'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import KakaoMap from '@/src/components/explores/KakaoMap';
import Tab from '@/src/components/shared/Tab';
import mountainDataProps from '@/src/types/mountainDataProps';
import getMountainData from '@/src/components/explores/api/getMountainData';
import { defaultInstance } from '@/src/lib/axiosInstance';

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

const ActivityText = styled.p`
  color: #000;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.66667rem;
  text-align: center;
  transition: transform 0.3s ease;
`;

const ActivityTab = styled.div<{ $team?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 14rem;
  border-right: 1px solid #000;

  &:hover ${ActivityText} {
    transform: translateY(-1rem);
  }
`;

const LastChildActivityTab = styled(ActivityTab)`
  border-right: none;
`;

const DetailsContainer = styled.div`
  display: flex;
  padding-top: 8rem;
  padding-bottom: 17.25rem;
  justify-content: space-between;
  gap: 8.5rem;
`;
const MountaineImage = styled.div``;

const StyledImage = styled(Image)``;

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
  const { data: clickedMountainData } = useQuery({
    queryKey: ['clickedMountainList'],
    queryFn: () => defaultInstance.get(`/explores/${exploreId}`),
  });

  const clickedMountain = clickedMountainData?.data.data;

  return (
    <>
      <Container>
        <Tab variant="explores" />
        <MainTitle>{clickedMountain?.mountain}</MainTitle>
        <MapContainer>
          <KakaoMap
            type="exploreSub"
            mountainList={[]}
            filteredItems={clickedMountain ? [clickedMountain] : []}
          />
        </MapContainer>
        <ActivityTabs>
          <StyledLink href={`/explores/${exploreId}/teams`}>
            <ActivityTab>
              <ActivityText>
                등산 모임 <br />
                {clickedMountain?.teamCnt}개
              </ActivityText>
            </ActivityTab>
          </StyledLink>
          <StyledLink href={`/explores/${exploreId}/reviews`}>
            <LastChildActivityTab>
              <ActivityText>
                등반 후기 <br />
                {clickedMountain?.reveiwCnt}개
              </ActivityText>
            </LastChildActivityTab>
          </StyledLink>
        </ActivityTabs>
        <DetailsContainer>
          <MountaineImage>
            <StyledImage
              width={260}
              height={260}
              objectFit="cover"
              src={clickedMountain?.imageUrls}
              alt="산 이미지"
            />
          </MountaineImage>
          <MountainContents>
            <MountainContent $outline>
              <Title>개요</Title>
              <Content>{clickedMountain?.explanation}</Content>
            </MountainContent>
            <MountainContent>
              <Title>산 높이</Title>
              <Content>{clickedMountain?.m_height}m</Content>
            </MountainContent>
            <MountainContent>
              <Title>위치</Title>
              <Content>{clickedMountain?.m_location}</Content>
            </MountainContent>
            <MountainContent>
              <Title>산 난이도</Title>
              <Content>{clickedMountain?.difficulty}</Content>
            </MountainContent>
          </MountainContents>
        </DetailsContainer>
      </Container>
    </>
  );
}
