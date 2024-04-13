import { ConfigProvider, Radio } from 'antd';
import useTeamCheckbox from '@/src/hooks/teams/useTeamCheckbox';
import styled from 'styled-components';

interface GenderFilterProps {
  checkedList: string[];
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function GenderFilter({
  checkedList,
  setCheckedList,
}: GenderFilterProps) {
  const { genderCheckedList, setGenderCheckedList } = useTeamCheckbox();
  const genderOptions = ['남성', '여성', '상관없음'];

  const onGenderOptionChange = (e: any) => {
    setGenderCheckedList([e.target.value]);
  };

  const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.125rem;
    align-self: stretch;
  `;

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 11.6,
          // fontWeight: 600,
          // display: flex;
          // flex-direction: column;
          // gap: 1.5rem;
          // padding: 1rem 0 0 0 !important;
          // margin-bottom: 1.17rem;
        },
      }}
    >
      <RadioContainer>
        <Radio.Group
          onChange={onGenderOptionChange}
          value={genderCheckedList.length > 0 ? genderCheckedList[0] : null}
        >
          {genderOptions.map((option) => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </RadioContainer>
    </ConfigProvider>
  );
}
