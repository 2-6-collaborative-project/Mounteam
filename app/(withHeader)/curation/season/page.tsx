'use client';

import { useEffect, useState } from 'react';
import { defaultInstance } from '@/src/lib/axiosInstance';
import Image from 'next/image';
import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import MountainInfo from '@/src/components/shared/MountainInfo';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

const MainTitle = styled.h2`
  display: flex;
  padding: 1.87rem 0 5rem 0;
  flex-direction: column;
  align-items: flex-start;
  color: ${colors.Grayscale[13]};
  ${typography.Heading30};

  @media (max-width: 768px) {
    padding: 1.25rem 0 5rem 0;
    ${typography.Heading24};
  }
`;

const ImageSection = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 6.25rem;

  & > img {
    width: 100%;
    height: auto;
  }
`;

const SeasonBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5.625rem;

  @media (max-width: 768px) {
    gap: 5rem;
  }

  @media (max-width: 768px) {
    gap: 2.1875rem;
  }
`;

const SeasonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5625rem;
`;

const SeasonTitle = styled.div`
  color: ${colors.Grayscale[13]};
  ${typography.Heading24};
`;

const MountainInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

interface MountainType {
  X좌표: number;
  Y좌표: number;
  명산_높이: number;
  명산_소재지: string;
  명산_이름: string;
  exploredId: number;
  mountain: string;
  imageUrls: string;
  m_location: string;
  m_height: string;
  teamCnt: number;
}

export default function Season() {
  const [springMountains, setSpringMountains] = useState<MountainType[]>([]);
  const [summerMountains, setSummerMountains] = useState<MountainType[]>([]);
  const [autumnMountains, setAutumnMountains] = useState<MountainType[]>([]);
  const [winterMountains, setWinterMountains] = useState<MountainType[]>([]);

  useEffect(() => {
    const fetchMountains = async (
      season: string,
      setMountains: React.Dispatch<React.SetStateAction<MountainType[]>>,
    ) => {
      try {
        const response = await defaultInstance.get(`/curation/${season}`);
        if (response.status === 200) {
          setMountains(response.data.data.content);
          // 데이터 확인용 console.log
          console.log(response.data.data.content);
        }
      } catch (error) {
        console.error(`Failed to fetch mountains for ${season}`, error);
      }
    };

    fetchMountains('spring', setSpringMountains);
    fetchMountains('summer', setSummerMountains);
    fetchMountains('autumn', setAutumnMountains);
    fetchMountains('winter', setWinterMountains);
  }, []);

  return (
    <div>
      <Tab variant="main" />
      <MainTitle>계절별 추천</MainTitle>
      <ImageSection>
        <Image
          src="/season.jpg"
          alt="메인 배경 이미지"
          width={992}
          height={436}
          layout="responsive"
          priority
        />
      </ImageSection>
      <SeasonBar>
        <SeasonSection>
          <SeasonTitle>봄에 가기 좋은 산</SeasonTitle>
          <MountainInfoContainer>
            {springMountains.map((mountain) => (
              <MountainInfo
                key={mountain.exploredId}
                type="curation"
                list={mountain}
              />
            ))}
          </MountainInfoContainer>
        </SeasonSection>
        <SeasonSection>
          <SeasonTitle>여름에 가기 좋은 산</SeasonTitle>
          <MountainInfoContainer>
            {summerMountains.map((mountain) => (
              <MountainInfo
                key={mountain.exploredId}
                type="curation"
                list={mountain}
              />
            ))}
          </MountainInfoContainer>
        </SeasonSection>
        <SeasonSection>
          <SeasonTitle>가을에 가기 좋은 산</SeasonTitle>
          <MountainInfoContainer>
            {autumnMountains.map((mountain) => (
              <MountainInfo
                key={mountain.exploredId}
                type="curation"
                list={mountain}
              />
            ))}
          </MountainInfoContainer>
        </SeasonSection>
        <SeasonSection>
          <SeasonTitle>겨울에 가기 좋은 산</SeasonTitle>
          <MountainInfoContainer>
            {winterMountains.map((mountain) => (
              <MountainInfo
                key={mountain.exploredId}
                type="curation"
                list={mountain}
              />
            ))}
          </MountainInfoContainer>
        </SeasonSection>
      </SeasonBar>
    </div>
  );
}
