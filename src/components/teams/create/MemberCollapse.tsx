import { Collapse, Radio, Space, Checkbox } from 'antd';
import type { RadioChangeEvent, GetProp } from 'antd';
import TeamCreationForm from '@/src/types/teams/create/teamCreation';
import { colors } from '@/app/styles/colors';

export default function MemberCollapse({
  handleTeamCreationForm,
}: {
  handleTeamCreationForm: (
    key: keyof TeamCreationForm,
    value: string | string[],
  ) => void;
}) {
  const onChangeRadio = (e: RadioChangeEvent) => {
    const { name, value } = e.target;

    handleTeamCreationForm(name as keyof TeamCreationForm, value);
  };

  const onChangeCheckbox: GetProp<typeof Checkbox.Group, 'onChange'> = (
    value,
  ) => {
    handleTeamCreationForm('ageRange', value as string[]);
  };

  return (
    <>
      <Collapse
        ghost={true}
        expandIconPosition="end"
        style={{
          padding: '2rem 0 1.4rem 0',
          fontSize: '1.6rem',
          fontWeight: '700',
          lineHeight: '3.2rem',
          borderBottom: `1px solid ${colors.Grayscale[5]}`,
          borderRadius: '0',
        }}
        items={[
          {
            label: '성별',
            children: (
              <Radio.Group name="gender" onChange={onChangeRadio}>
                <Space
                  direction="vertical"
                  style={{
                    fontSize: '1.4rem', // Doesn't Work
                    fontWeight: '600',
                    lineHeight: '2rem',
                    gap: '1.8rem',
                  }}
                >
                  <Radio value={'male'}>남성</Radio>
                  <Radio value={'female'}>여성</Radio>
                  <Radio value={'all'}>상관 없음</Radio>
                </Space>
              </Radio.Group>
            ),
          },
        ]}
      />

      <Collapse
        ghost={true}
        expandIconPosition="end"
        style={{
          padding: '2rem 0 1.4rem 0',
          fontSize: '1.6rem',
          fontWeight: '700',
          lineHeight: '3.2rem',
          borderBottom: `1px solid ${colors.Grayscale[5]}`,
          borderRadius: '0',
        }}
        items={[
          {
            label: '연령대',
            children: (
              <Checkbox.Group name="ageRange" onChange={onChangeCheckbox}>
                <Space
                  direction="vertical"
                  style={{
                    fontSize: '1.4rem', // Doesn't Work
                    fontWeight: '600',
                    lineHeight: '2rem',
                    gap: '1.8rem',
                  }}
                >
                  <Checkbox value={'teenager'}>10대</Checkbox>
                  <Checkbox value={'twenties'}>20대</Checkbox>
                  <Checkbox value={'thirties'}>30대</Checkbox>
                  <Checkbox value={'fourties'}>40대</Checkbox>
                  <Checkbox value={'fifties'}>50대</Checkbox>
                  <Checkbox value={'sixties'}>60대 이상</Checkbox>
                </Space>
              </Checkbox.Group>
            ),
          },
        ]}
      />
    </>
  );
}
