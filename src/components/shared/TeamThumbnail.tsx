'use client';

import styled from 'styled-components';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

const TeamBox = styled.div`
  display: flex;
  width: 100%;
  padding: 1.125rem 0.9375rem;
  align-items: center;
  gap: 1.875rem;
  box-sizing: border-box;
  /* border: 1.4px solid ${colors.Grayscale[1]}; */
  &:hover {
    border-radius: 0.1875rem;
    /* border: 1.4px solid ${colors.Primary[500]}; */
    box-shadow: 0 0 0 1px ${colors.Primary[500]} inset;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ImageSection = styled.div`
  width: 6.875rem;
  height: 6.875rem;
  border-radius: 100%;
  background: ${colors.Grayscale[5]};

  @media (max-width: 768px) {
    width: 7.5rem;
    height: 7.5rem;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    width: 6.875rem;
    height: 6.875rem;
  }
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.Grayscale[7]};
  ${typography.Body16}
`;

const Title = styled.div`
  color: ${colors.Grayscale[13]};
  ${typography.Heading20};
  padding-bottom: 0.31rem;
`;

const TeamCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6875rem;
  flex-shrink: 0;
`;

const TeamChips = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6875rem;
  flex-shrink: 0;
`;

const GenderRange = styled.div`
  display: flex;
  padding: 0.1875rem 0.4375rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.1875rem;
  background: ${colors.Primary[50]};
  color: ${colors.Primary[500]};
  text-align: center;
  ${typography.Footnote14};
`;

const AgeRange = styled.div`
  display: flex;
  padding: 0.1875rem 0.4375rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.1875rem;
  background: ${colors.System[`Warning_bg`]};
  color: ${colors.System[`Warning`]};
  text-align: center;
  ${typography.Footnote14};
`;

interface TeamFeedType {
  teamId: number;
  exploreId: string;
  title: string;
  departureDay: string;
  ageRange: string[];
  genderRange: string[];
}

// 클릭 시 상세페이지로 이동하는 기능 추가, 산 아이디에 따른 이름 변환 필요

export default function TeamThumbnail({ team }: { team: TeamFeedType }) {
  const formatDate = (dateStr: any) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours();
    const formattedDate = `${month}.${day}(${dayOfWeek})`;
    const formattedTime = `${hours > 12 ? '오후' : '오전'} ${hours > 12 ? hours - 12 : hours}시`;

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(team.departureDay);

  const renderGenderText = () => {
    const genderRanges = Array.isArray(team.genderRange)
      ? team.genderRange
      : [team.genderRange];

    if (genderRanges.includes('male') && genderRanges.includes('female')) {
      return '성별무관';
    } else if (genderRanges.includes('male')) {
      return '남성만';
    } else if (genderRanges.includes('female')) {
      return '여성만';
    }
    return ''; // genderRange가 빈 문자열이거나 빈 배열인 경우
  };

  const renderAgeRangeText = () => {
    const ageRanges = Array.isArray(team.ageRange)
      ? team.ageRange
      : [team.ageRange];
    return ageRanges
      .map((age) => {
        switch (age) {
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
          default:
            return '';
        }
      })
      .join(', ');
  };

  return (
    <TeamBox>
      <ImageSection />
      <TeamCol>
        <TeamInfo>
          <Title>{team.title}</Title>
          <p>{`${team.exploreId} | ${formattedDate} | ${formattedTime}`}</p>
        </TeamInfo>
        <TeamChips>
          <GenderRange>
            <p>{renderGenderText()}</p>
          </GenderRange>
          <AgeRange>
            <p>{renderAgeRangeText()}</p>
          </AgeRange>
        </TeamChips>
      </TeamCol>
    </TeamBox>
  );
}
