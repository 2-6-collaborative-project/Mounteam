'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';
import { IBM } from '@/app/styles/.fonts';

interface Team {
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
  cursor: pointer;

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
  text-align: center;
  white-space: pre-line;

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

  .team-date-time {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 999px) {
    .team-date-time {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .team-date-time {
      flex-direction: row;
    }
  }
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
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6875rem;
  flex-direction: row;

  @media (max-width: 999px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 692px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    flex-direction: row;
  }
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

const formatMountainName = (name: string) => {
  const bracketIndex = name.indexOf('(');
  if (bracketIndex !== -1) {
    return `${name.substring(0, bracketIndex)}\n${name.substring(bracketIndex)}`;
  } else if (name.length === 4) {
    return `${name.substring(0, 2)}\n${name.substring(2)}`;
  }
  return name;
};

export default function TeamThumbnail({ team }: { team: Team }) {
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

  type AgeRange =
    | 'teenager'
    | 'twenties'
    | 'thirties'
    | 'fourties'
    | 'fifties'
    | 'sixties';

  const ageMapping: { [K in AgeRange]: number } = {
    teenager: 10,
    twenties: 20,
    thirties: 30,
    fourties: 40,
    fifties: 50,
    sixties: 60,
  };

  const renderAgeRangeText = () => {
    const ageRanges: AgeRange[] = Array.isArray(team.ageRange)
      ? (team.ageRange as AgeRange[])
      : [team.ageRange as AgeRange];

    const sortedAges = ageRanges.sort((a, b) => ageMapping[a] - ageMapping[b]);

    const ageRangeTexts = sortedAges.map((age) => {
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
    });

    if (ageRangeTexts.length > 3) {
      return `${ageRangeTexts.slice(0, 3).join(', ')}...`;
    } else {
      return ageRangeTexts.join(', ');
    }
  };

  return (
    <TeamBox onClick={handleClick}>
      <ImageSection className={IBM.className}>
        {formatMountainName(team.mountain)}
      </ImageSection>
      <TeamCol>
        <TeamInfo>
          <Title>{truncateTitle(team.title)}</Title>
          <div className="team-date-time">
            <p>{`${team.mountain} | ${formattedDate} | `}</p>
            <p>{`${formattedTime}`}</p>
          </div>
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
