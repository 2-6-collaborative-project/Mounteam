import { useQuery } from '@tanstack/react-query';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import getMountainData from '@/src/components/explores/api/getMountainData';
import mountainDataProps from '@/src/types/mountainDataProps';

export default function useExploreCheckbox() {
  const { data: mountainList } = useQuery({
    queryKey: ['mountainList'],
    queryFn: () => getMountainData(),
  });

  const handleCheckListChange = (
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

  const handleFilterCheckedList = (
    optionRange: number[],
    setSearchedMountain: any,
  ) => {
    const filteredItem = mountainList.filter(
      (list: mountainDataProps) =>
        optionRange[0] < list.명산_높이 && list.명산_높이 < optionRange[1],
    );

    setSearchedMountain(filteredItem);
  };

  const handleCheckAllChange = (
    e: CheckboxChangeEvent,
    option: string[],
    setCheckedList: (list: string[]) => void,
  ) => {
    setCheckedList(e.target.checked ? option : []);
  };

  return {
    handleCheckAllChange,
    handleCheckListChange,
    handleFilterCheckedList,
  };
}
