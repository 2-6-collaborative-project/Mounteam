import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Checkbox } from 'antd';

interface HeightFilterProps {
  heightCheckedList: string[];
  setHeightCheckedList: (list: string[]) => void;
}
const heightOptions = [
  { label: '500m 미만', range: [0, 500] },
  { label: '500 ~ 1000m', range: [500, 1000] },
  { label: '1000 ~ 1500m', range: [1000, 1500] },
  { label: '1500m 이상', range: [1500, Infinity] },
];

export default function HeightFilter({
  heightCheckedList,
  setHeightCheckedList,
}: HeightFilterProps) {
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
          handleCheckAllChange(
            e,
            heightOptions.map((option) => option.label),
            setHeightCheckedList,
          )
        }
        checked={heightCheckedList.length === heightOptions.length}
      >
        전체 선택
      </Checkbox>
      {heightOptions.map((option) => (
        <Checkbox
          key={option.label}
          onChange={() =>
            handleCheckboxListChange(
              option.label,
              heightCheckedList,
              setHeightCheckedList,
            )
          }
          checked={heightCheckedList.includes(option.label)}
        >
          {option.label}
        </Checkbox>
      ))}
    </>
  );
}
