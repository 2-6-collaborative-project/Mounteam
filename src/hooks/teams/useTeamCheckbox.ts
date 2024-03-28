import { useState } from 'react';

export default function useTeamCheckbox() {
  const [ageCheckedList, setAgeCheckedList] = useState<string[]>([]);
  const [genderCheckedList, setGenderCheckedList] = useState<string[]>([]);

  const handleAgeChange = (checkedValues: string[]) => {
    setAgeCheckedList(checkedValues);
  };

  const handleGenderChange = (checkedValues: string[]) => {
    setGenderCheckedList(checkedValues);
  };

  return {
    ageCheckedList,
    setAgeCheckedList: handleAgeChange,
    genderCheckedList,
    setGenderCheckedList: handleGenderChange,
  };
}
