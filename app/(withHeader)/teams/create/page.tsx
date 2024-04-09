'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import useTeamCreationForm from '@/src/hooks/teams/create/useTeamCreationForm';
import { authInstance } from '@/src/lib/axiosInstance';
import MoutainSearchBar from '@/src/components/teams/create/MoutainSearchBar';
import CustomInput from '@/src/components/shared/CustomInput';
import CustomTextArea from '@/src/components/shared/CustomTextArea';
import TeamDatePicker from '@/src/components/teams/create/TeamDatePicker';
import MemberCollapse from '@/src/components/teams/create/MemberCollapse';
// import CourseRadio from '@/src/components/teams/create/CourseRadio';
import CustomButton from '@/src/components/shared/CustomButton';
import Modals from '@/src/components/shared/Modal';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';
import teamCreationFormValidation from '@/src/utils/teams/create/formValidation';
import { TEAMS_URL } from '@/src/utils/apiUrl';

const Layout = styled.div`
  width: 50%;
  margin: 0 auto;
  max-width: 1200px;
  font-size: 1.6rem;

  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StepSection = styled.div`
  &:not(:first-child) {
    margin-top: 7rem;
  }
`;

const Title = styled.div`
  color: rgba(0, 0, 0, 0.85);
  ${typography.Footnote16}
`;

const Description = styled.div`
  color: rgba(0, 0, 0, 0.45);
  ${typography.Body14}
  margin-bottom: 3rem;
`;

const SubTitle = styled.div`
  color: ${colors.Grayscale[13]};
  ${typography.Footnote14};
`;

const ButtonWrapper = styled.div`
  margin-top: 13.2rem;
  margin-bottom: 14.9rem;

  @media (max-width: 768px) {
    margin-top: 8rem;
    margin-bottom: 5.9rem;
  }
`;

const GuideMessage = styled.div`
  margin-left: 1.5rem;
  color: rgba(0, 0, 0, 0.45);
  ${typography.Footnote12};
`;

export default function TeamCreationPage() {
  const [isValid, setIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { teamCreationFormData, handleTeamCreationForm } =
    useTeamCreationForm();

  const handleCreateButton = () => {
    setIsModalOpen((prev) => !prev);
  };

  const createTeam = async () => {
    const result = await authInstance.post(TEAMS_URL, teamCreationFormData);

    if (result.status === 200) {
      return router.push(`/teams/${result.data.data}`);
    }
  };

  useEffect(() => {
    if (teamCreationFormValidation(teamCreationFormData) === true) {
      setIsValid(true);
    } else setIsValid(false);
  }, [teamCreationFormData]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <StepSection>
          <Title>1. 어떤 산을 도전해볼까요?</Title>
          <Description>
            이번에 어떤 산을 등반하고 싶은지 정해주세요 :{')'}
          </Description>

          <div style={{ marginBottom: '2rem' }}>
            <Title>산 선택하기</Title>
          </div>

          <MoutainSearchBar
            teamCreationFormData={teamCreationFormData}
            handleTeamCreationForm={handleTeamCreationForm}
            placeholder="탐험하고 싶은 산 검색하기"
          />

          {/* 추후 코스 기능 사용 시 Custom Hook, type과 함께 주석 해제 */}
          {/* <div style={{ marginTop: '2.5rem', marginBottom: '2rem' }}>
          <Title>코스 선택하기</Title>
        </div>

        <CourseRadio
          teamCreationFormData={teamCreationFormData}
          handleTeamCreationForm={handleTeamCreationForm}
        /> */}
        </StepSection>

        <StepSection>
          <Title>2. 모임을 소개해 주세요 :{')'}</Title>
          <Description>이 모임의 핵심을 간략히 적어주세요 :{')'}</Description>

          <div
            style={{
              marginBottom: '0.7rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SubTitle>제목</SubTitle>
            <GuideMessage>최소 5글자 이상 작성해주세요.</GuideMessage>
          </div>
          <CustomInput
            onChange={(e) => handleTeamCreationForm('title', e.target.value)}
            maxLength={30}
            showCount={true}
          />

          <div
            style={{
              marginTop: '3rem',
              marginBottom: '0.7rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SubTitle>소개글</SubTitle>
            <GuideMessage>최소 10글자 이상 작성해주세요.</GuideMessage>
          </div>
          <CustomTextArea
            onChange={(e) => handleTeamCreationForm('content', e.target.value)}
            maxLength={300}
            showCount={true}
          />
        </StepSection>

        <StepSection>
          <Title>3. 언제 만날까요?</Title>
          <Description>모이고 싶은 날짜와 시간을 알려주세요:{')'}</Description>

          <div style={{ marginBottom: '2rem' }}>
            <Title>날짜와 시간 선택하기</Title>
          </div>

          <TeamDatePicker handleTeamCreationForm={handleTeamCreationForm} />
        </StepSection>

        <StepSection>
          <Title>4. 어떤 멤버들과 함께 할까요?</Title>
          <Description>
            함께하고 싶은 멤버들이 어떤 사람들인지 알려주세요:{')'}
          </Description>

          <MemberCollapse handleTeamCreationForm={handleTeamCreationForm} />
        </StepSection>

        <StepSection>
          <div style={{ marginBottom: '0.7rem' }}>
            <Title>오픈카톡방 링크</Title>
          </div>
          <CustomInput
            onChange={(e) => handleTeamCreationForm('chatLink', e.target.value)}
          />

          <div style={{ marginTop: '3rem', marginBottom: '0.7rem' }}>
            <Title>비밀번호</Title>
          </div>
          <CustomInput
            onChange={(e) =>
              handleTeamCreationForm('chatPassword', e.target.value)
            }
          />
        </StepSection>

        <ButtonWrapper>
          <CustomButton
            onClick={handleCreateButton}
            type="primary"
            size="large"
            block
            disabled={!isValid}
          >
            모임 만들기
          </CustomButton>
        </ButtonWrapper>

        <Modals
          type="check"
          modalOpenState={isModalOpen}
          setter={setIsModalOpen}
          confirmFunc={createTeam}
        />
      </Layout>
    </Suspense>
  );
}
