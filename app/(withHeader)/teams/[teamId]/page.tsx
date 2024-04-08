'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import styled from 'styled-components';
import { Modal } from 'antd';
import Tab from '@/src/components/shared/Tab';
import UserProfile from '@/src/components/teams/userProfile';
import CustomButton from '@/src/components/shared/CustomButton';
import typography from '@/app/styles/typography';
import { authInstance } from '@/src/lib/axiosInstance';
import { TEAMS_URL, USER_URL } from '@/src/utils/apiUrl';
import TeamDetails from '@/src/types/teams/teamDetails';
import { LoggedInUser } from '@/src/types/auth';

const myFont = localFont({
  src: '../../../styles/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

const Container = styled.div`
  margin-top: 8rem;
  display: flex;
  justify-content: space-between;
  white-space: pre-line;
  word-wrap: break-word;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ContentsSection = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 6rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 6.7rem;
  }
`;

const Title = styled.div`
  margin-bottom: 3rem;
  color: #2d3648;
  ${typography.Heading24};
`;

const Content = styled.div`
  ${typography.Body20}
`;

const InfoSection = styled.div`
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InfoTitle = styled.div`
  color: #2d3648;
  ${typography.Heading20}
`;

const AuthorInfo = styled.div`
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 5rem;
  }
`;

const TeamInfo = styled.div`
  ${typography.Body20}
`;

const TeamInfoTopLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const TeamInfoButtonsGroup = styled.div`
  ${typography.Footnote12}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
`;

const TeamInfoButton = styled.div`
  cursor: pointer;
`;

const TeamInfoLinesGorup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TeamInfoLine = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1.5fr 3fr;
`;

const ApplyButtonWrapper = styled.div`
  margin-top: 8rem;

  @media (max-width: 768px) {
    margin-bottom: 5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 8rem;
  }
`;

interface AgeMap {
  [key: string]: number;
}

export default function TeamDetailsPage() {
  const [detailsData, setDetailsData] = useState<TeamDetails>();
  const [loggedInUserData, setLoggedInUserData] = useState<LoggedInUser>();

  const params = useParams();
  const router = useRouter();

  const teamId = params.teamId as string;

  const getDetailsData = async (teamId: string) => {
    const response = await authInstance.get(`${TEAMS_URL}/${teamId}`);

    if (response.status === 200) {
      setDetailsData(response.data.data);
    }
  };

  const getLoggedInUserData = async () => {
    const response = await authInstance.get(`${USER_URL}/profile`);

    if (response.status === 200) {
      setLoggedInUserData(response.data.data);
    }
  };

  const handleAgeRage = (ageRange: string[]) => {
    const ageMap: AgeMap = {
      teenager: 10,
      twenties: 20,
      thirties: 30,
      fourties: 40,
      fifties: 50,
      sixties: 60,
    };

    const sortNumbers = (numbers: number[]) => {
      return numbers.sort((a, b) => a - b);
    };

    const numberAgeRange = ageRange.map((stringAge) => {
      return ageMap[stringAge];
    });

    const sortedAgeRange = sortNumbers(numberAgeRange);

    const textAgeRange = sortedAgeRange
      .map((e) => {
        if (e === 60) {
          return '60대 이상';
        } else {
          return `${e}대`;
        }
      })
      .join(', ');

    return textAgeRange;
  };

  const handleGender = (gender: string) => {
    let text;

    if (gender === 'male') {
      text = '남성';
    } else if (gender === 'female') {
      text = '여성';
    } else text = '상관 없음';

    return text;
  };

  const handleEditButton = (teamId: string) => {
    if (detailsData?.createByMe !== true) {
      alert('주최자만이 수정할 수 있습니다.');
      return;
    }

    router.push(`/teams/edit/${teamId}`);
  };

  const handleDeleteButton = async (teamId: string) => {
    if (detailsData?.createByMe !== true) {
      alert('주최자만이 삭제할 수 있습니다.');
      return;
    }

    try {
      const res = await authInstance.delete(`${TEAMS_URL}/${teamId}`);

      if (res.status === 200) {
        router.push('/teams/');
      }
    } catch (error) {
      throw new Error();
    }
  };

  const handleApplyButton = async () => {
    const res = await authInstance.get(`${TEAMS_URL}/${teamId}/join`);

    if (res.status === 200) {
      if (res.data.statusCode === 200) {
        Modal.info({
          title: '오픈 카톡에 입장하여 인사를 나눠보세요.',
          content: (
            <div>
              <br />
              <p>
                <span style={{ fontWeight: 'bold' }}>링크: </span>
                {`${detailsData?.chatLink}`}
              </p>
              <br />
              <p>
                <span style={{ fontWeight: 'bold' }}>비밀번호: </span>
                {`${detailsData?.chatPassword}`}
              </p>
            </div>
          ),
          style: {
            fontFamily: myFont.style.fontFamily,
          },
          okText: '확인',
          onOk() {},
        });

        return;
      }

      if (res.data.statusCode !== 200) {
        Modal.error({
          title: `${res.data.msg}`,
        });

        return;
      }
    }
  };

  useEffect(() => {
    getDetailsData(teamId);
  }, [teamId]);

  useEffect(() => {
    getLoggedInUserData();
  }, []);

  return (
    <>
      <Tab variant="explores" />
      <Container>
        <ContentsSection>
          <Title>{detailsData?.title}</Title>
          <Content>{detailsData?.content}</Content>
        </ContentsSection>

        <InfoSection>
          <AuthorInfo>
            <InfoTitle style={{ marginBottom: '2rem' }}>주최자 정보</InfoTitle>
            {detailsData && (
              <UserProfile
                img={detailsData.author.profileImageUrl}
                level={detailsData.author.level}
                nickname={detailsData.author.nickname}
                authorGender={detailsData.author.authorGender}
                authorAgeRange={detailsData.author.authorAgeRange}
                areaInterest={detailsData.author.areaInterest}
              />
            )}
          </AuthorInfo>

          <TeamInfo>
            <TeamInfoTopLabel>
              <InfoTitle>모임 정보</InfoTitle>
              {detailsData?.createByMe === true && (
                <TeamInfoButtonsGroup>
                  <TeamInfoButton onClick={() => handleEditButton(teamId)}>
                    수정
                  </TeamInfoButton>
                  |
                  <TeamInfoButton onClick={() => handleDeleteButton(teamId)}>
                    삭제
                  </TeamInfoButton>
                </TeamInfoButtonsGroup>
              )}
            </TeamInfoTopLabel>

            <TeamInfoLinesGorup>
              <TeamInfoLine>
                <InfoTitle>장소</InfoTitle>
                <div>{detailsData?.mountain}</div>
              </TeamInfoLine>
              <TeamInfoLine>
                <InfoTitle>출발 일자</InfoTitle>
                <div>{detailsData?.departureDay}</div>
              </TeamInfoLine>
              <TeamInfoLine>
                <InfoTitle>연령대</InfoTitle>
                {detailsData && (
                  <div>{handleAgeRage(detailsData?.ageRange)}</div>
                )}
              </TeamInfoLine>
              <TeamInfoLine>
                <InfoTitle>성별</InfoTitle>
                {detailsData && <div>{handleGender(detailsData?.gender)}</div>}
              </TeamInfoLine>
            </TeamInfoLinesGorup>
          </TeamInfo>

          <ApplyButtonWrapper>
            <CustomButton
              onClick={handleApplyButton}
              type="primary"
              size="large"
              block
            >
              모임 신청하기
            </CustomButton>
          </ApplyButtonWrapper>
        </InfoSection>
      </Container>
    </>
  );
}
