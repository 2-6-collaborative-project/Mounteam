'use client';

import styled from 'styled-components';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

const TeamBox = styled.div`
  display: flex;
  padding: 1.125rem 0.9375rem;
  align-items: center;
  gap: 1.875rem;
  border: 1.4px solid ${colors.Grayscale[1]};

  &:hover {
    border-radius: 0.1875rem;
    border: 1.4px solid ${colors.Primary[500]};
  }
`;

const ImageSection = styled.div`
  width: 6.875rem;
  height: 6.875rem;
  border-radius: 100%;
  background: ${colors.Grayscale[5]};
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
  ageRange: string;
  genderRange: string;
  description: string;
  kakaoLink: string;
  kakaoPassword: string;
}

// 클릭 시 상세페이지로 이동하는 기능 추가 필요

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
            <p>{team.genderRange}만</p>
          </GenderRange>
          <AgeRange>
            <p>{`${team.ageRange}대만`}</p>
          </AgeRange>
        </TeamChips>
      </TeamCol>
    </TeamBox>
  );
}
