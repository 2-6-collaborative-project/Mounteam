import { Collapse, Radio, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';
import TeamCreationForm from '@/src/types/teams/create/teamsCreate';
import { colors } from '@/app/styles/colors';

export default function MemberCollapse({
  handleTeamCreationForm,
}: {
  handleTeamCreationForm: (
    key: keyof TeamCreationForm,
    value: string | boolean,
  ) => void;
}) {
  const onChangeRadio = (e: RadioChangeEvent) => {
    const { name, value } = e.target;

    handleTeamCreationForm(name as keyof TeamCreationForm, value);
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
              <Radio.Group name="genderRange" onChange={onChangeRadio}>
                <Space
                  direction="vertical"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    lineHeight: '2rem',
                    gap: '1.8rem',
                  }}
                >
                  <Radio value={'male'}>남성</Radio>
                  <Radio value={'female'}>여성</Radio>
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
              <Radio.Group name="ageRange" onChange={onChangeRadio}>
                <Space
                  direction="vertical"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    lineHeight: '2rem',
                    gap: '1.8rem',
                  }}
                >
                  <Radio value={'teenager'}>10대</Radio>
                  <Radio value={'twenties'}>20대</Radio>
                  <Radio value={'thirties'}>30대</Radio>
                  <Radio value={'fourties'}>40대</Radio>
                  <Radio value={'fifties'}>50대</Radio>
                  <Radio value={'sixties'}>60대 이상</Radio>
                </Space>
              </Radio.Group>
            ),
          },
        ]}
      />
    </>
  );
}
