import { Checkbox } from 'antd';
import useExploreCheckbox from '@/src/hooks/explore/useExploreCheckbox';

interface RegionFilterProps {
  regionCheckedList: string[];
  setRegionCheckedList: (list: string[]) => void;
}

export default function RegionFilter({
  regionCheckedList,
  setRegionCheckedList,
}: RegionFilterProps) {
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

  const { handleCheckAllChange, handleCheckListChange } = useExploreCheckbox();

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
            handleCheckListChange(
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
