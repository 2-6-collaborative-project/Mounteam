import { Checkbox } from 'antd';
import useExploreCheckbox from '@/src/hooks/explore/useExploreCheckbox';
import useFilterMountainStore from '@/src/store/useFilterMountainStore';
import getMountainData from '../api/getMountainData';
import { useQuery } from '@tanstack/react-query';
import mountainDataProps from '@/src/types/mountainDataProps';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

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
  const { filteredItems, setFilteredItems } = useFilterMountainStore();
  const { data: mountainList } = useQuery({
    queryKey: ['mountainList'],
    queryFn: () => getMountainData(),
  });

  const { handleCheckAllChange, handleCheckListChange } = useExploreCheckbox();

  const handleCheckBoxChage = (
    e: CheckboxChangeEvent,
    option: { label: string; range: number[] },
  ) => {
    handleCheckListChange(
      option.label,
      heightCheckedList,
      setHeightCheckedList,
    );
    handleFilterCheckedList(e, option.range);
  };

  const handleFilterCheckedList = (
    e: CheckboxChangeEvent,
    optionRange: number[],
  ) => {
    if (!e.target.checked) {
      const updatedItems = filteredItems.filter(
        (list: mountainDataProps) =>
          !(optionRange[0] < list.명산_높이 && list.명산_높이 < optionRange[1]),
      );
      setFilteredItems(updatedItems);
    } else {
      const addFilteredItems = mountainList.filter(
        (list: mountainDataProps) =>
          optionRange[0] < list.명산_높이 && list.명산_높이 < optionRange[1],
      );
      setFilteredItems([...filteredItems, ...addFilteredItems]);
    }
  };

  const handleCheckBoxAllChange = (e: CheckboxChangeEvent) => {
    handleCheckAllChange(
      e,
      heightOptions.map((option) => option.label),
      setHeightCheckedList,
    );

    handleFilterAllChecked(e);
  };
  const handleFilterAllChecked = (e: CheckboxChangeEvent) => {
    if (!e.target.checked) {
      setFilteredItems([]);
    } else {
      // 전체 선택 체크된 경우
      setFilteredItems(mountainList);
    }
  };

  return (
    <>
      <Checkbox
        onChange={(e) => handleCheckBoxAllChange(e)}
        checked={heightCheckedList.length === heightOptions.length}
      >
        전체 선택
      </Checkbox>
      {heightOptions.map((option) => (
        <Checkbox
          key={option.label}
          onChange={(e) => handleCheckBoxChage(e, option)}
          checked={heightCheckedList.includes(option.label)}
        >
          {option.label}
        </Checkbox>
      ))}
    </>
  );
}
