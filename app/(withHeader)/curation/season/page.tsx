'use client';

import { useEffect, useState } from 'react';
import { defaultInstance } from '@/src/lib/axiosInstance';
import Image from 'next/image';
import styled, { css } from 'styled-components';
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

const MountainRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const ArrowButton = styled.button<{ disabled: boolean }>`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`;

interface MountainType {
  exploreId: number;
  mountain: string;
  imageUrls: string;
  m_height: string;
  m_location: string;
  difficulty: string;
  teamCnt: number;
  reveiwCnt: number;
  hasNext: boolean;
  xdata: string;
  ydata: string;
}

interface PageData {
  page: number;
  totalPages: number;
}

const fetchMountains = async (
  season: string,
  page: number,
  setMountains: React.Dispatch<React.SetStateAction<MountainType[]>>,
  setPageData: React.Dispatch<React.SetStateAction<PageData>>,
) => {
  try {
    const response = await defaultInstance.get(
      `/curation/${season}?page=${page}`,
    );
    if (response.status === 200) {
      setMountains(response.data.data.content);
      setPageData({
        page: response.data.data.pageable.pageNumber,
        totalPages: response.data.data.totalPages,
      });
    }
  } catch (error) {
    console.error(`Failed to fetch mountains for ${season}`, error);
  }
};

export default function Season() {
  const [springMountains, setSpringMountains] = useState<MountainType[]>([]);
  const [springPageData, setSpringPageData] = useState<PageData>({
    page: 0,
    totalPages: 0,
  });

  const [summerMountains, setSummerMountains] = useState<MountainType[]>([]);
  const [summerPageData, setSummerPageData] = useState<PageData>({
    page: 0,
    totalPages: 0,
  });

  const [autumnMountains, setAutumnMountains] = useState<MountainType[]>([]);
  const [autumnPageData, setAutumnPageData] = useState<PageData>({
    page: 0,
    totalPages: 0,
  });

  const [winterMountains, setWinterMountains] = useState<MountainType[]>([]);
  const [winterPageData, setWinterPageData] = useState<PageData>({
    page: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchMountains('spring', 0, setSpringMountains, setSpringPageData);
    fetchMountains('summer', 0, setSummerMountains, setSummerPageData);
    fetchMountains('autumn', 0, setAutumnMountains, setAutumnPageData);
    fetchMountains('winter', 0, setWinterMountains, setWinterPageData);
  }, []);

  const handlePrev = (
    season: string,
    setPageData: React.Dispatch<React.SetStateAction<PageData>>,
    pageData: PageData,
    setMountains: React.Dispatch<React.SetStateAction<MountainType[]>>,
  ) => {
    if (pageData.page > 0) {
      fetchMountains(season, pageData.page - 1, setMountains, setPageData);
    }
  };

  const handleNext = (
    season: string,
    setPageData: React.Dispatch<React.SetStateAction<PageData>>,
    pageData: PageData,
    setMountains: React.Dispatch<React.SetStateAction<MountainType[]>>,
  ) => {
    if (pageData.page < pageData.totalPages - 1) {
      fetchMountains(season, pageData.page + 1, setMountains, setPageData);
    }
  };

  const renderSeasonSection = (
    title: string,
    mountains: MountainType[],
    season: string,
    setPageData: React.Dispatch<React.SetStateAction<PageData>>,
    pageData: PageData,
    setMountains: React.Dispatch<React.SetStateAction<MountainType[]>>,
  ) => (
    <SeasonSection>
      <SeasonTitle>{title}</SeasonTitle>
      <MountainRow>
        <ArrowButton
          onClick={() =>
            handlePrev(season, setPageData, pageData, setMountains)
          }
          disabled={pageData.page === 0}
        >
          <Image src="/leftbutton.svg" alt="왼쪽 버튼" width={40} height={40} />
        </ArrowButton>
        <MountainInfoContainer>
          {mountains.map((mountain, index) => (
            <MountainInfo
              key={`${mountain.exploreId}-${index}`}
              type="curation"
              list={mountain}
            />
          ))}
        </MountainInfoContainer>
        <ArrowButton
          onClick={() =>
            handleNext(season, setPageData, pageData, setMountains)
          }
          disabled={pageData.page === pageData.totalPages - 1}
        >
          <Image
            src="/rightbutton.svg"
            alt="오른쪽 버튼"
            width={40}
            height={40}
          />
        </ArrowButton>
      </MountainRow>
    </SeasonSection>
  );

  return (
    <div>
      <Tab />
      <MainTitle>계절별 추천</MainTitle>
      <ImageSection>
        <Image
          width={992}
          height={436}
          src="/season.jpg"
          alt="메인 배경 이미지"
          layout="responsive"
          priority
        />
      </ImageSection>
      <SeasonBar>
        {renderSeasonSection(
          '봄에 가기 좋은 산',
          springMountains,
          'spring',
          setSpringPageData,
          springPageData,
          setSpringMountains,
        )}
        {renderSeasonSection(
          '여름에 가기 좋은 산',
          summerMountains,
          'summer',
          setSummerPageData,
          summerPageData,
          setSummerMountains,
        )}
        {renderSeasonSection(
          '가을에 가기 좋은 산',
          autumnMountains,
          'autumn',
          setAutumnPageData,
          autumnPageData,
          setAutumnMountains,
        )}
        {renderSeasonSection(
          '겨울에 가기 좋은 산',
          winterMountains,
          'winter',
          setWinterPageData,
          winterPageData,
          setWinterMountains,
        )}
      </SeasonBar>
    </div>
  );
}
