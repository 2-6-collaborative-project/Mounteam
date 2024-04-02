'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';
import { IBM } from '@/app/styles/.fonts';

interface TeamFeedType {
  teamId: number;
  mountain: string;
  title: string;
  departureDay: string;
  ageRange: string[];
  gender: string;
}

const TeamBox = styled.div`
  display: flex;
  width: 100%;
  padding: 0.88819rem;
  align-items: flex-start;
  gap: 1.23356rem;
  box-sizing: border-box;

  &:hover {
    border-radius: 0.1875rem;
    box-shadow: 0 0 0 1px ${colors.Primary[500]} inset;
  }

  @media (max-width: 768px) {
    padding: 0.86844rem;
  }

  @media (max-width: 480px) {
    gap: 1.5625rem;
    padding: 1.125rem 0.9375rem;
  }
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.105rem;
  height: 7.105rem;
  border-radius: 100%;
  background: ${colors.Primary[500]};
  color: ${colors.Grayscale[1]};
  font-size: 1.6rem;
  line-height: 1.75rem;

  @media (max-width: 768px) {
    width: 7.5rem;
    height: 7.5rem;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    width: 11rem;
    height: 11rem;
    font-size: 2rem;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const TeamRange = styled.div`
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

export default function TeamThumbnail({ team }: { team: TeamFeedType }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/teams/${team.teamId}`);
  };

  const truncateTitle = (title: string) => {
    return title.length > 10 ? `${title.substring(0, 10)}...` : title;
  };

  const formatDate = (dateStr: string) => {
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
    switch (team.gender) {
      case 'male':
        return '남성만';
      case 'female':
        return '여성만';
      case 'all':
        return '성별무관';
      default:
        return '';
    }
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
    <TeamBox onClick={handleClick}>
      <ImageSection className={IBM.className}>{team.mountain}</ImageSection>
      <TeamCol>
        <TeamInfo>
          <Title>{truncateTitle(team.title)}</Title>
          <p>{`${team.mountain} | ${formattedDate} | ${formattedTime}`}</p>
        </TeamInfo>
        <TeamChips>
          <TeamRange>
            <p>{renderGenderText()}</p>
          </TeamRange>
          <TeamRange>
            <p>{renderAgeRangeText()}</p>
          </TeamRange>
        </TeamChips>
      </TeamCol>
    </TeamBox>
  );
}
