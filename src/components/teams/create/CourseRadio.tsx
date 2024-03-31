// 모임 생성 중 코스 선택 제외로 인한 미사용

import { useState } from 'react';
import styled from 'styled-components';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space } from 'antd';
import TeamCreationForm from '@/src/types/teams/create/teamCreation';
import typography from '@/app/styles/typography';
import { colors } from '@/app/styles/colors';

const courseMockData = [
  { id: 1, value: '제 1코스' },
  { id: 2, value: '제 2코스' },
  { id: 3, value: '제 3코스' },
  { id: 4, value: '제 4코스' },
  { id: 5, value: '제 5코스' },
];

interface CourseProps {
  $isSelected: boolean;
}

const CourseList = styled.div`
  ${typography.Body16};
`;

const Course = styled.div<CourseProps>`
  padding: 0.7rem 2rem 0.7rem 4.5rem;
  align-items: center;
  border: 1px solid ${colors.Grayscale[4]};
  background: ${(props) =>
    props.$isSelected ? colors.Primary[50] : colors.Grayscale[1]};
  cursor: pointer;
  word-wrap: break-word;

  &:hover {
    background-color: ${colors.Primary[50]};
  }
`;

const ErrorMessage = styled.div`
  color: ${colors.System.Error};
  ${typography.Footnote12}
`;

export default function CourseRadio({
  teamCreationFormData,
  handleTeamCreationForm,
}: {
  teamCreationFormData: TeamCreationForm;
  handleTeamCreationForm: (
    key: keyof TeamCreationForm,
    value: string | boolean,
  ) => void;
}) {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const onChangeRadio = (e: RadioChangeEvent) => {
    handleTeamCreationForm('isCourseSelectNow', e.target.value);
  };

  return (
    <Radio.Group onChange={onChangeRadio} style={{ width: '100%' }}>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          fontWeight: '400',
          lineHeight: '2rem',
          gap: '1.5rem',
        }}
      >
        <Radio
          value={false}
          onClick={() => {
            setSelectedCourseId(null);
            handleTeamCreationForm('course', '');
          }}
        >
          <span
            style={{
              fontSize: '1.6rem',
            }}
          >
            추후에 팀원들과 함께 결정할게요.
          </span>
        </Radio>
        <Radio value={true}>
          <span
            style={{
              fontSize: '1.6rem',
            }}
          >
            지금 결정할게요.
          </span>
        </Radio>
        {teamCreationFormData.isCourseSelectNow === true ? (
          <CourseList>
            {courseMockData.length > 0 ? (
              courseMockData.map((course) => {
                return (
                  <Course
                    key={course.id}
                    $isSelected={selectedCourseId === course.id}
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      handleTeamCreationForm('course', course.value);
                    }}
                  >
                    {course.value}
                  </Course>
                );
              })
            ) : (
              <ErrorMessage>탐험할 산을 먼저 선택해주세요.</ErrorMessage>
            )}
          </CourseList>
        ) : null}
      </Space>
    </Radio.Group>
  );
}
