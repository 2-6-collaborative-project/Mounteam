import type { RadioChangeEvent } from 'antd';
import { Radio, Space } from 'antd';
import TeamCreationForm from '@/src/types/teams/create/teamsCreate';

export default function CourseRadio({
  handleTeamCreationForm,
}: {
  handleTeamCreationForm: (
    key: keyof TeamCreationForm,
    value: string | boolean,
  ) => void;
}) {
  const onChangeRadio = (e: RadioChangeEvent) => {
    handleTeamCreationForm('isCourseSelected', e.target.value);
  };

  return (
    <Radio.Group onChange={onChangeRadio}>
      <Space
        direction="vertical"
        style={{
          fontSize: '1.6rem', // Doesn't Work
          fontWeight: '400',
          lineHeight: '2rem',
          gap: '1.5rem',
        }}
      >
        <Radio value={false}>
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
      </Space>
    </Radio.Group>
  );
}
