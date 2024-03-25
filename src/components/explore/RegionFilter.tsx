import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Checkbox } from 'antd';

interface RegionFilterProps {
  regionCheckedList: string[];
  setRegionCheckedList: (list: string[]) => void;
}
const regionOptions = [
  '서울',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주도',
];

export default function RegionFilter({
  regionCheckedList,
  setRegionCheckedList,
}: RegionFilterProps) {
  const handleCheckboxListChange = (
    option: string,
    checkedList: string[],
    setCheckedList: (list: string[]) => void,
  ) => {
    const currentIndex = checkedList.indexOf(option);
    const newCheckedList = [...checkedList];

    if (currentIndex === -1) {
      newCheckedList.push(option);
    } else {
      newCheckedList.splice(currentIndex, 1);
    }

    setCheckedList(newCheckedList);
  };

  const handleCheckAllChange = (
    e: CheckboxChangeEvent,
    option: string[],
    setCheckedList: (list: string[]) => void,
  ) => {
    setCheckedList(e.target.checked ? option : []);
  };
  return (
    <>
      <Checkbox
        onChange={(e) =>
          handleCheckAllChange(e, regionOptions, setRegionCheckedList)
        }
        checked={regionCheckedList.length === regionOptions.length}
      >
        전체 선택
      </Checkbox>
      {regionOptions.map((option) => (
        <Checkbox
          key={option}
          onChange={() =>
            handleCheckboxListChange(
              option,
              regionCheckedList,
              setRegionCheckedList,
            )
          }
          checked={regionCheckedList.includes(option)}
        >
          {option}
        </Checkbox>
      ))}
    </>
  );
}
