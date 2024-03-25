import type { CheckboxChangeEvent } from 'antd/lib/checkbox';

export default function useExploreCheckbox() {
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

  return {
    handleCheckAllChange,
    handleCheckboxListChange,
  };
}
