'use client';

import styled from 'styled-components';
import useTeamCreationForm from '@/src/hooks/teams/create/useTeamCreationForm';
import CourseRadio from '@/src/components/teams/create/CourseRadio';
import CustomInput from '@/src/components/shared/CustomInput';
import CustomTextArea from '@/src/components/shared/CustomTextArea';
import TeamDatePicker from '@/src/components/teams/create/TeamDatePicker';
import TeamTimePicker from '@/src/components/teams/create/TeamTimePicker';
import CustomButton from '@/src/components/shared/CustomButton';
import MemberCollapse from '@/src/components/teams/create/MemberCollapse';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

const Layout = styled.div`
  margin: 0 auto;
  font-size: 1.6rem;

  @media (min-width: 480px) {
    width: 416px;
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1200px) {
    width: 524px;
  }
`;

const StepSection = styled.div`
  &:not(:first-child) {
    margin-top: 7.2rem;
  }

  @media (min-width: 768px) {
    &:not(:first-child) {
      margin-top: 8.6rem;
    }
  }
`;

const Title = styled.div`
  color: rgba(0, 0, 0, 0.85);
  ${typography.Footnote16}
`;

const Description = styled.div`
  color: rgba(0, 0, 0, 0.45);
  ${typography.Body14}
`;

const SubTitle = styled.div`
  color: ${colors.Grayscale[13]};
  ${typography.Footnote14};
`;

export default function TeamCreationPage() {
  const { teamCreationFormData, handleTeamCreationForm } =
    useTeamCreationForm();

  const handleCreateButton = () => {
    console.log(teamCreationFormData);
  };

  return (
    <Layout>
      <StepSection>
        <Title>1. 어떤 산을 도전해볼까요?</Title>
        <Description>
          이번에 어떤 산을 등반하고 싶은지 정해주세요 :{')'}
        </Description>

        <Title>산 선택하기</Title>

        <Title>코스 선택하기</Title>

        <CourseRadio />
      </StepSection>

      <StepSection>
        <Title>2. 모임을 소개해 주세요 :{')'}</Title>
        <Description>이 모임의 핵심을 간략히 적어주세요 :{')'}</Description>

        <SubTitle>제목</SubTitle>
        <CustomInput
          onChange={(e) => handleTeamCreationForm('title', e.target.value)}
        />

        <SubTitle>소개글</SubTitle>
        <CustomTextArea
          onChange={(e) =>
            handleTeamCreationForm('description', e.target.value)
          }
        />
      </StepSection>

      <StepSection>
        <Title>3. 언제 만날까요?</Title>
        <Description>모이고 싶은 날짜와 시간을 알려주세요:{')'}</Description>

        <Title>날짜와 시간 선택하기</Title>
        <div>
          <TeamDatePicker />
        </div>
        <div>
          <TeamTimePicker />
        </div>
      </StepSection>

      <StepSection>
        <Title>4. 어떤 멤버들과 함께 할까요?</Title>
        <Description>
          함께하고 싶은 멤버들이 어떤 사람들인지 알려주세요:{')'}
        </Description>

        <MemberCollapse handleTeamCreationForm={handleTeamCreationForm} />
      </StepSection>

      <StepSection>
        <SubTitle>오픈카톡방 링크</SubTitle>
        <CustomInput
          onChange={(e) => handleTeamCreationForm('kakaoLink', e.target.value)}
        />
        <SubTitle>비밀번호</SubTitle>
        <CustomInput
          onChange={(e) =>
            handleTeamCreationForm('kakaoPasword', e.target.value)
          }
        />
      </StepSection>

      <CustomButton
        onClick={handleCreateButton}
        type="primary"
        size="large"
        block
      >
        모임 만들기
      </CustomButton>
    </Layout>
  );
}
