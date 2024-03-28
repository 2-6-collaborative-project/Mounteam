import { Checkbox } from 'antd';
import useTeamCheckbox from '@/src/hooks/teams/useTeamCheckbox';

interface AgeFilterProps {
  checkedList: string[];
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AgeFilter({
  checkedList,
  setCheckedList,
}: AgeFilterProps) {
  const { ageCheckedList, setAgeCheckedList } = useTeamCheckbox();
  const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

  const onAgeOptionChange = (option: any) => {
    const newList = ageCheckedList.includes(option)
      ? ageCheckedList.filter((item) => item !== option)
      : [...ageCheckedList, option];
    setAgeCheckedList(newList);
  };

  const onCheckAllChange = (e: any) => {
    setAgeCheckedList(e.target.checked ? ageOptions : []);
  };

  return (
    <>
      <Checkbox
        onChange={onCheckAllChange}
        checked={ageCheckedList.length === ageOptions.length}
      >
        전체 선택
      </Checkbox>
      {ageOptions.map((option) => (
        <Checkbox
          key={option}
          onChange={() => onAgeOptionChange(option)}
          checked={ageCheckedList.includes(option)}
        >
          {option}
        </Checkbox>
      ))}
    </>
  );
}
