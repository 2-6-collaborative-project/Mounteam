import { Radio } from 'antd';
import useTeamCheckbox from '@/src/hooks/teams/useTeamCheckbox';
import styled from 'styled-components';

interface GenderFilterProps {
  checkedList: string[];
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
}

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.125rem;
  align-self: stretch;

  .ant-radio-group {
    display: flex;
    flex-direction: column;
    gap: 1.125rem;
  }

  .ant-radio-wrapper > span {
    font-size: 1.16rem;
    font-weight: 600;
  }
`;

export default function GenderFilter({
  checkedList,
  setCheckedList,
}: GenderFilterProps) {
  const { genderCheckedList, setGenderCheckedList } = useTeamCheckbox();
  const genderOptions = ['여자만', '남자만', '상관없음'];

  const onGenderOptionChange = (e: any) => {
    setGenderCheckedList([e.target.value]);
  };

  return (
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
  );
}
