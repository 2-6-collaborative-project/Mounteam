import { Checkbox } from 'antd';
import useTeamCheckbox from '@/src/hooks/teams/useTeamCheckbox';

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

  const onGenderOptionChange = (option: any) => {
    const newList = genderCheckedList.includes(option)
      ? genderCheckedList.filter((item) => item !== option)
      : [...genderCheckedList, option];
    setGenderCheckedList(newList);
  };

  const onCheckAllChange = (e: any) => {
    setGenderCheckedList(e.target.checked ? genderOptions : []);
  };

  return (
    <>
      <Checkbox
        onChange={onCheckAllChange}
        checked={genderCheckedList.length === genderOptions.length}
      >
        전체 선택
      </Checkbox>
      {genderOptions.map((option) => (
        <Checkbox
          key={option}
          onChange={() => onGenderOptionChange(option)}
          checked={genderCheckedList.includes(option)}
        >
          {option}
        </Checkbox>
      ))}
    </>
  );
}
