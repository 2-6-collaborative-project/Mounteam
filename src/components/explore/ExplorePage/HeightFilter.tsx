import { Checkbox } from 'antd';
import useExploreCheckbox from '@/src/hooks/explore/useExploreCheckbox';

interface HeightFilterProps {
  heightCheckedList: string[];
  setHeightCheckedList: (list: string[]) => void;
}

export default function HeightFilter({
  heightCheckedList,
  setHeightCheckedList,
}: HeightFilterProps) {
  const heightOptions = [
    { label: '500m 미만', range: [0, 500] },
    { label: '500 ~ 1000m', range: [500, 1000] },
    { label: '1000 ~ 1500m', range: [1000, 1500] },
    { label: '1500m 이상', range: [1500, Infinity] },
  ];

  const { handleCheckAllChange, handleCheckboxListChange } =
    useExploreCheckbox();

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
